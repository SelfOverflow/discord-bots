resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/${var.project_name}"
  retention_in_days = 14

  tags = local.common_tags
}
