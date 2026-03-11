variable "aws_region" {
  default = "ap-south-1"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_cidr" {
  default = "10.0.1.0/24"
}

variable "availability_zone_1a" {
  default = "ap-south-1a"
}

variable "all_ips_cidr" {
  default = "0.0.0.0/0"
}

variable "project_name" {
  default = "bablu-bot"
}

variable "image_tag" {
  type    = string
  default = "latest"
}