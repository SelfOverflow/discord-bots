data "aws_iam_policy_document" "bablu-ecs-node-doc" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "execution_secrets_policy" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue"
    ]
    resources = [
      aws_secretsmanager_secret.discord_token.arn
    ]
  }
}

resource "aws_iam_policy" "execution_secrets_policy" {
  name   = "${var.project_name}-execution-secrets-policy"
  policy = data.aws_iam_policy_document.execution_secrets_policy.json
}

resource "aws_iam_role_policy_attachment" "execution_secrets_attach" {
  role       = aws_iam_role.bablu-ecs-node-role.name
  policy_arn = aws_iam_policy.execution_secrets_policy.arn
}

resource "aws_iam_role" "bablu-ecs-node-role" {
  name               = "${var.project_name}-role"
  assume_role_policy = data.aws_iam_policy_document.bablu-ecs-node-doc.json
}

resource "aws_iam_role_policy_attachment" "bablu-ecs-node-role-policy" {
  role       = aws_iam_role.bablu-ecs-node-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "bablu-ecs-node" {
  name = "${var.project_name}-ecs-node-profile"
  path = "/ecs/instance/"
  role = aws_iam_role.bablu-ecs-node-role.name
}