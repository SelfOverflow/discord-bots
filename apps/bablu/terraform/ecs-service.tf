resource "aws_ecs_task_definition" "bot" {
  family                   = "${var.project_name}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 512
  memory                   = 1024

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "bot"
      image     = aws_ecr_repository.bablu-ecr.repository_url
      essential = true

      portMappings = []

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "DYNAMODB_TABLE"
          value = aws_dynamodb_table.users.name
        },
        {
          name  = "SQS_QUEUE_URL"
          value = aws_sqs_queue.events.url
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])

  tags = local.common_tags
}

resource "aws_ecs_service" "bot" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.bot.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  tags = local.common_tags
}