
# WEB-1: Update homepage styling #done
# 1. Use the local provider to create files
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

provider "local" {}

# 2. Define the content of the application
locals {
  app_code = <<EOF
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from Terraform WebApp!");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
EOF
}

# 3. Create the file index.js in webapp/src/
resource "local_file" "webapp_app" {
  content  = local.app_code
  filename = "${path.module}/webapp/src/index.js"
}
# Terraform will create the folder structure automatically.

# 4. Output the file path
output "webapp_file_path" {
  value       = local_file.webapp_app.filename
  description = "The full path to the web application's index.js file."
}
