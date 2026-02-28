locals {
  project_prefix = var.project_name

  common_tags = {
    Project     = var.project_name
    Environment = "mono"
    ManagedBy   = "terraform"
  }
}