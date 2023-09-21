resource "aws_ecr_repository" "my_docker_repository" {
  name = var.ecr_repo_name
}
