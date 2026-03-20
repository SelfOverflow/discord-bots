resource "aws_secretsmanager_secret" "discord_token" {
  name = "${var.project_name}-discord-bot-token"
}