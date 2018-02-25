#![feature(proc_macro)]

#[macro_use]
extern crate stdweb;

use std::mem;
use std::slice;
use stdweb::web::*;
use stdweb::traits::*;
use stdweb::unstable::TryInto;

use stdweb::web::event::{
  MouseMoveEvent,
  ResizeEvent,
};

use stdweb::web::html_element::CanvasElement;
use stdweb::js_export;

macro_rules! enclose {
  (($( $x:ident ),*) $y:expr) => {
    {
      $(let $x = $x.clone();)*
      $y
    }
  };
}

fn alloc(size: usize) -> *mut u8 {
  let mut buffer = Vec::with_capacity(size);
  let ptr = buffer.as_mut_ptr();
  mem::forget(buffer);
  ptr
}

fn dealloc(ptr: *mut u8, capacity: usize) {
  unsafe  {
    let _ = Vec::from_raw_parts(ptr, 0, capacity);
  }
}

fn address_to_slice<'a, T>(address: u32, size: usize) -> &'a mut [T] {
  unsafe {
    slice::from_raw_parts_mut(address as *mut T, size)
  }
}

#[js_export]
fn fill(address: u32, max_width: u32, max_height: u32, time: f64) {
  // Pixels are stored in RGBA, so each pixel is 4 bytes
  let byte_size = max_width as usize * max_height as usize * 4;
  let sl = address_to_slice(address, byte_size);

  for i in 0..byte_size {
    // Retrieve the position of current pixel
    let height = i / 4 / max_height as usize;
    let width  = i / 4 % max_width as usize;

    match i % 4 {
      // Red Channel
      0 => {
        // Create a red ripple effect from the top left corner
        let len = ((height * height + width * width) as f64).sqrt();
        let nb = time + len / 4.0;

        let a = 128.0 + nb.cos() * 128.0;
        sl[i] = a as u8;
      },

      // Green Channel
      1 => {
        // Create a green ripple effect from the top right corner
        let width = 500 - width;
        let len = ((height * height + width * width) as f64).sqrt();
        let nb = time + len / 4.0;

        let a = 128.0 + nb.cos() * 128.0;
        sl[i] = a as u8;
      },

      // Alpha Channel
      3 => {
        // Set the opacity to 1
        sl[i] = 255;
      },

      _ => {}
    }
  }
}

#[js_export]
fn malloc(size: usize) -> u32 {
  let ptr = alloc(size);

  ptr as u32
}

// Passes a pointer to a buffer, the size of the corresponding canvas
// and the current timestamp
#[js_export]
fn canvas() {
  let canvas: CanvasElement = document().query_selector("canvas").unwrap().unwrap().try_into().unwrap();
  let context: CanvasRenderingContext2d = canvas.get_context().unwrap();

  canvas.set_width(canvas.offset_width() as u32);
  canvas.set_height(canvas.offset_height() as u32);

  window().add_event_listener(enclose!((canvas) move |_: ResizeEvent| {
    canvas.set_width(canvas.offset_width() as u32);
    canvas.set_height(canvas.offset_height() as u32);
  }));

  canvas.add_event_listener(enclose!((context) move |event: MouseMoveEvent| {
    let x = f64::from(event.client_x());
    let y = f64::from(event.client_y());

    context.fill_rect(x, y, 3.0, 3.0);
  }));
}

#[js_export]
fn instance() -> stdweb::Value {
	return js! {
	  return Module.instance.exports;
	};
}

#[js_export]
fn process() {
	console!(log, "Processing Streams");
}

fn main() {
	console!(log, "Rust Module is Initialized.");
}
