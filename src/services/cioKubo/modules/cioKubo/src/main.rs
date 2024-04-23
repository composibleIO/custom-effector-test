#![allow(non_snake_case)]

use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use ipfs_effector_imports as ipfs;
use std::fs;
use std::path::PathBuf;

module_manifest!();

pub fn main() {}

#[marine]
pub fn get(ipfs_api: String, cid: String) -> String {
    let path = vault_path("output");
    let result = ipfs::get(ipfs_api, cid, &path);
    if result.success {
        match std::fs::read_to_string(&path) {
            Ok(result) => result,
            Err(err) => err.to_string()
        }
    } else {
        result.error
    }
}


#[marine]
pub fn getFolders(ipfs_api: String, cid: String, path_: String) -> String {
    let path = vault_path(&path_);
    let result = ipfs::get(ipfs_api, cid, &path);
    if result.success {  
        "ok".to_string()    
    } else {
        result.error
    }
}


#[marine]
pub fn add(ipfs_api: String, content: String) -> String {
    let path = vault_path("output");
    let _ = fs::write(PathBuf::from(path.clone()), content);
    let result = ipfs::add(ipfs_api, path);
    if result.success {
        result.hash
    } else {
        result.error
    }
}

#[marine]
pub fn addFolders(ipfs_api: String, path_: String) -> String {
    let path = vault_path(&path_);
    let result = ipfs::add(ipfs_api, path);
    if result.success {
        result.hash
    } else {
        result.error
    }
}


#[marine]
pub fn inspectParticleVault() -> Vec<String> {

    let mut filenames = Vec::new();
    let vault = vault();

    // Read the directory
    let dir_entries = fs::read_dir(vault).unwrap();

    // Iterate over the directory entries
    for entry in dir_entries {
        let entry = entry.unwrap();
        let file_name = entry.file_name().into_string().unwrap(); // Convert OsString to String
        filenames.push(file_name);
    }

    filenames
}

#[marine]
pub fn inspectParticleVaultFolder(path: String) -> Vec<String> {

    let mut filenames = Vec::new();
    let vault = vault_path(&path);

    // Read the directory
    let dir_entries = fs::read_dir(vault).unwrap();

    // Iterate over the directory entries
    for entry in dir_entries {
        let entry = entry.unwrap();
        let file_name = entry.file_name().into_string().unwrap(); // Convert OsString to String
        filenames.push(file_name);
    }

    filenames
}

// Since all effectors are working via the Particle Vault, you need to provide a correct path to the vault.
// At the moment, we don't have any nice library for this sort of things, so you need to do it manually.
//
// Here we need to create a path to the vault which has a form of `/tmp/vault/{particle-id}-{particle-token}`.
// In this directory, you can freely write and read any files you need. Note that this directory exists only when
// a particle that called the function exsits, so you'll see here a different path each run.
fn vault_path(filename: &str) -> String {
    let cp = marine_rs_sdk::get_call_parameters();
    format!("/tmp/vault/{}-{}/{}", cp.particle.id, cp.particle.token, filename)
}

fn vault() -> String {
    let cp = marine_rs_sdk::get_call_parameters();
    format!("/tmp/vault/{}-{}", cp.particle.id, cp.particle.token)
}
