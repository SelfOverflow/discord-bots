resource "aws_ecr_repository" "bablu-ecr" {
  name = "bablu-container-repository"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.common_tags
}
