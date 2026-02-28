variable "aws_region" {
  default = "ap-south-1"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "project_name" {
  default = "bablu-bot"
}

variable "image_tag" {
  type = string
  default = "latest"
}