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