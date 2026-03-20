resource "aws_cloudwatch_log_group" "bablu-ecs" {
  name              = "/ecs/bablu-ecs"
  retention_in_days = 14
}