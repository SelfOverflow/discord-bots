output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnets" {
  value = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id
  ]
}

output "ecs_security_group" {
  value = aws_security_group.ecs_sg.id
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.users.name
}

output "sqs_queue_url" {
  value = aws_sqs_queue.events.url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecr_repository_url" {
  value = aws_ecr_repository.bablu-ecr.repository_url
}

output "ecs_execution_role_arn" {
  value = aws_iam_role.ecs_execution_role.arn
}

output "ecs_task_role_arn" {
  value = aws_iam_role.ecs_task_role.arn
}