 
FROM golang:1.24.4-bookworm

# Install Rust and Cargo
RUN apt-get update && apt-get install -y curl

# Install Node.js and npm
RUN apt-get install -y nodejs npm # 加上註解：安裝 Node.js 和 npm

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Set the PATH environment variable to include Cargo's bin directory
ENV PATH="/root/.cargo/bin:${PATH}"

RUN mkdir -p /opt/

RUN cargo install vtracer --root /opt
# 加上註解：指定 vtracer 執行的完整路徑
