use multipart_form_data::{{MultipartFormDataWriter}};
use rand::Rng;
use std::path::Path;
use std::fs;
use mime_guess2;


fn boundary() -> String {

    let mut rng = rand::thread_rng();
    let random_string: String = (0..12)
        .map(|_| rng.gen_range(0..=9).to_string())
        .collect();

    random_string
}

pub struct Form {       
    writer: MultipartFormDataWriter<Vec<u8>>
}

impl Form {

    pub fn new() -> Form  {

        let writer = MultipartFormDataWriter::with_boundary(
            vec![],
            format!("---boundary{}", boundary())
          );

          Form {
            writer
        }
    }

    pub fn writeFile(self: &mut Self, path: &Path, trimmedPath: &String) {

        let file_content = fs::read(path).unwrap();

        let guess = mime_guess2::from_path(path);
        let mime = guess.first();

        if mime.is_some() {
    
            let _ = self.writer.write_field(
                String::from("file"),
                file_content, 
                Some(trimmedPath.as_str()), 
                Some(mime.unwrap().to_string().as_str()), 
                None
            );

        } else {

            let _ = self.writer.write_field(
                String::from("file"),
                file_content, 
                Some(trimmedPath.as_str()), 
                None, 
                None
            );

        }
    }

    pub fn writeText(self: &mut Self, key: &str, value: &String) {

        self.writer.write_text_field(key, value);
    }

    pub fn finish(self: Self) -> String {

        let buf = self.writer.finish().unwrap(); 
        String::from_utf8(buf.clone()).unwrap()
    }

    pub fn boundary(self: &Self) -> &String {

        &self.writer.boundary
    }
}