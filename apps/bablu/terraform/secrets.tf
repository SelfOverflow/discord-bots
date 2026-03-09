resource "aws_secretsmanager_secret" "discord_token" {
  name = "${var.project_name}-discord-app-token"
  tags = local.common_tags
}

resource "aws_secretsmanager_secret" "app_id" {
  name = "${var.project_name}-bot-client-id"
  tags = local.common_tags
}

