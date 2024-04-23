#![allow(non_snake_case)]
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use cio_curl_effector_imports as curl;
use cio_curl_effector_imports::{{CurlRequest,HttpHeader}};

use std::fs;
use walkdir::WalkDir;
use std::path::{{PathBuf,Path}};
use std::collections::HashMap;

module_manifest!();

mod multipart;
mod pinata;   

pub fn main() {}

#[marine]
pub fn addFolder(folder: String, pinataJWTKey: String) -> pinata::PinataResult {

  let path = vault_path(&folder);

  let mut result = String::from("");
  let url = String::from("https://api.pinata.cloud/pinning/pinFileToIPFS");

  let pin_data = pinata::PinData {
    pinata_metadata: Some(pinata::PinMetadata {
      name: Some(folder.clone()),
      // keyvalues: HashMap::new()
    }),
    pinata_options : None
  };

  let mut form = multipart::Form::new();

  let files = fs::read_dir(path.clone())
    .unwrap()
    .filter_map(|e| e.ok())
    .map(|e| e.path())
    .collect::<Vec<_>>();

    for file_path in files {
      let base_path = Path::new(&file_path);
      if base_path.is_dir() {
        for entry_result in WalkDir::new(base_path) {
          let entry = entry_result.unwrap();
          let path = entry.path();
          if path.is_dir() { continue }

          let trimmedPath = pinata::trimPath(path, &folder);
          form.writeFile(path, &trimmedPath);
        }

      } else {

        let trimmedPath = pinata::trimPath(base_path, &folder);
        form.writeFile(base_path, &trimmedPath);
      }
    }
    
    if let Some(metadata) = pin_data.pinata_metadata {
      form.writeText("pinataMetadata", &serde_json::to_string(&metadata).unwrap());
    }
    
    if let Some(option) = pin_data.pinata_options {
      form.writeText("pinataOptions", &serde_json::to_string(&option).unwrap());
    }
  
    let h1 = HttpHeader {
        name: "Authorization".to_string(),
        value: format!("Bearer {}", pinataJWTKey)
        // ['Content-type'] = "multipart/form-data; boundary= ".concat(boundaryValue);
    };

    let h2 = HttpHeader {
      name: "Content-type".to_string(),
      value: format!("multipart/form-data; boundary={}", &form.boundary())
    };

    let source_path = crate::vault_path("tl_body");
    let target_path = crate::vault_path("tl_response");
    let body = form.finish();
    let _ = fs::write(PathBuf::from(source_path.clone()), body.clone());

    let request = CurlRequest {
        url: url.clone(),    
        headers: vec![h1,h2]
    };

    let response = curl::curl_post_binary(request, source_path, target_path.clone());

    if response.success {
        result = fs::read_to_string(target_path.clone()).unwrap();
    } 

    // result

    pinata::formatResult(&result) 
    
  }

fn vault_path(filename: &str) -> String {
    let cp = marine_rs_sdk::get_call_parameters();
    format!("/tmp/vault/{}-{}/{}", cp.particle.id, cp.particle.token, filename)
}
