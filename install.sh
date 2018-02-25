# Install Rust
curl https://sh.rustup.rs -sSf | sh
rustup update

# Install Nightly Rust
rustup default nightly
rustup update nightly

# Adds the WebAssembly Target
rustup target add wasm32-unknown-unknown --toolchain nightly

# Install cargo-web via stable Rust
# NOTE: You need stable Rust to install cargo-web on macOS, for now.
cargo install -f cargo-web

