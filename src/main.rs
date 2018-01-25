#[macro_use]
extern crate stdweb;

use stdweb::web::*;

pub static SECRET_KEY: &str = "SUPER_DUPER_SECRET_KEY";

fn fetch(url: &str) -> stdweb::Value {
  let promise = js! {
    return fetch(@{url})
  };

  promise
}

fn hello() -> String {
  js! {
    console.log("Rust is Ready!");
  }

  let result = fetch("https://jsonplaceholder.typicode.com");

  js! {
    @{result}.then(console.log)
  }

  let window = window();
  let storage = window.local_storage();

  storage.insert(SECRET_KEY, "Who's There?");

  String::from("Hi!")
}

fn main() {
  stdweb::initialize();

  js! {
    Module.exports.hello = @{hello};
    Module.exports.SECRET_KEY = @{SECRET_KEY};
  }

  stdweb::event_loop()
}
