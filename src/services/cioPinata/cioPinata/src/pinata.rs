use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::{{Path}};
use serde_json::Value;
use crate::marine;           

// use marine_rs_sdk::marine;

#[marine]
#[derive(Debug,Serialize, Deserialize, Clone)]
pub struct PinataResult {
    pub ipfsHash: String,
    pub pinSize: u64,
    pub timestamp: String,
    pub isDuplicate: bool
}

#[derive(Debug,Serialize, Deserialize, Clone)]
pub enum MetadataValue {
    String(String),
    Float(f64),
    Integer(u64),
    Delete,
}

pub type MetadataKeyValues = HashMap<String, MetadataValue>;

#[derive(Debug,Serialize, Deserialize, Clone)]
pub enum Region {
    FRA1,
    NYC1,
}

#[derive(Debug,Serialize, Deserialize, Clone)]
pub struct RegionPolicy {
    pub id: Region,
    pub desired_replication_count: u8,
}

#[derive(Debug,Serialize, Deserialize, Clone)]
pub struct PinPolicy {
    pub regions: Vec<RegionPolicy>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PinMetadata {
    pub name: Option<String>,
        // pub keyvalues: MetadataKeyValues,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PinOptions {
    pub host_nodes: Option<Vec<String>>,
    pub custom_pin_policy: Option<PinPolicy>,
    pub cid_version: Option<u8>
}


#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PinData  {
    pub pinata_metadata: Option<PinMetadata>,
    pub pinata_options: Option<PinOptions>
}

pub fn trimPath(path: &Path, folder: &String) -> String {

    let pathEls: Vec<&str> = path.to_str().unwrap().split('/').collect();
    let index =  pathEls.iter().position(|s| s == folder).unwrap();
    pathEls[index..].join("/").to_string()
}

pub fn formatResult(r: &String) -> PinataResult {

    let v: Value = serde_json::from_str(r).unwrap();

    PinataResult {
        ipfsHash: v["IpfsHash"].to_string().replace("\"",""),
        pinSize: v["PinSize"].as_u64().unwrap(),
        timestamp: v["Timestamp"].to_string().replace("\"",""),
        isDuplicate: v["isDuplicate"].as_bool().unwrap()                
    }

}

