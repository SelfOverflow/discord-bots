terraform {
  backend "s3" {
    bucket       = "bablu-terraform-state"
    key          = "terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
  }
}