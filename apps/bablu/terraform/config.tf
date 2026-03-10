terraform {
  backend "s3" {
    bucket       = "bablu-terraform-state"
    key          = "terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
  }
}

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }
}

provider "aws" {
  region = var.aws_region
}