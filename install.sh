# Install Rust
curl https://sh.rustup.rs -sSf | sh
rustup update

# Install Nightly Rust
rustup default nightly
rustup update nightly

# Adds the WebAssembly Target
rustup target add wasm32-unknown-unknown --toolchain nightly

# Install wasm-gc
cargo install --force --git https://github.com/alexcrichton/wasm-gc

# Install cargo-web via stable Rust
# NOTE: You need stable Rust to install cargo-web on macOS, for now.
cargo +stable install cargo-web

# Test to see if it actually works
cargo web build --message-format=json --target wasm32-unknown-unknown --release
