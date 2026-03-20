data "aws_ssm_parameter" "ecs_node_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_ecs_cluster" "bablu-ecs-cluster" {
  name = "${var.project_name}-ecs-cluster"
}

resource "aws_launch_template" "bablu-ecs-ec2" {
  name                   = "${var.project_name}-ecs-ec2"
  image_id               = data.aws_ssm_parameter.ecs_node_ami.value
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.public-security-group.id]

  iam_instance_profile {
    arn = aws_iam_instance_profile.bablu-ecs-node.arn
  }
  monitoring { enabled = true }

  user_data = base64encode(<<-EOF
      #!/bin/bash
      echo ECS_CLUSTER=${aws_ecs_cluster.bablu-ecs-cluster.name} >> /etc/ecs/ecs.config;
    EOF
  )
}

resource "aws_autoscaling_group" "ecs" {
  name                      = "${var.project_name}-ecs-autoscaling-group"
  vpc_zone_identifier       = [aws_subnet.bablu-public-subnet.id]
  min_size                  = 1
  max_size                  = 2
  health_check_grace_period = 0
  health_check_type         = "EC2"
  protect_from_scale_in     = false

  launch_template {
    id      = aws_launch_template.bablu-ecs-ec2.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "${var.project_name}-ecs-cluster"
    propagate_at_launch = true
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = ""
    propagate_at_launch = true
  }
}