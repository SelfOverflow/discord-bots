resource "aws_ecs_task_definition" "bot" {
  family                   = "${var.project_name}-task"
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "bot"
      image     = "${aws_ecr_repository.bablu-ecr.repository_url}:${var.image_tag}"
      essential = true
      memory    = 1024
      cpu       = 1

      secrets = [
        {
          name      = "DISCORD_TOKEN"
          valueFrom = aws_secretsmanager_secret.discord_token.arn
        },
        {
          name      = "CLIENT_ID"
          valueFrom = aws_secretsmanager_secret.app_id.arn
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
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

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  tags = local.common_tags
}

data "aws_ami" "ecs" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-*-x86_64-ebs"]
  }
}

resource "aws_launch_template" "ecs" {
  name_prefix   = "ecs-bot"
  image_id      = "ami-0f559c3642608c138"
  instance_type = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.ec2_ecs.id ]

  user_data = base64encode(<<EOF
#!/bin/bash
echo ECS_CLUSTER=${aws_ecs_cluster.main.name} >> /etc/ecs/ecs.config
EOF
  )

  iam_instance_profile {
    arn = aws_iam_instance_profile.ecs.arn
  }

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.ec2_ecs.id]
  }
}

resource "aws_security_group" "ec2_ecs" {
  name        = "${var.project_name}-ecs-ec2-sg"
  description = "Security group for ECS container instances"
  vpc_id      = aws_vpc.main.id

  # No inbound access required
  ingress = []

  # Allow outbound traffic to internet
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_autoscaling_group" "ecs" {
  min_size            = 1
  max_size            = 1
  desired_capacity    = 1
  vpc_zone_identifier = [aws_subnet.public_a.id]

  launch_template {
    id      = aws_launch_template.ecs.id
    version = "$Latest"
  }
}