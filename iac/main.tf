terraform {
  backend "s3" {
    bucket                  = "tfstate-demo-2023"
    key                     = "terraform.tfstate"
    region                  = "us-east-1"
    encrypt                 = true
    shared_credentials_file = "./.secretaws"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_iam_role" "apprunner_role" {
  name = "AppRunnerRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "apprunner.amazonaws.com",
        },
      },
    ],
  })
}

resource "aws_apprunner_service" "my_drone_service" {
  service_name = local.service_name

  source_configuration {
    authentication_configuration {
      connection_arn = local.connection_arn
    }

    auto_deployments_enabled = false

    code_repository {
      repository_url = local.git_repo_url

      source_code_version {
        type  = "BRANCH"
        value = "main"
      }

      code_configuration {
        configuration_source = "API"

        code_configuration_values {
          build_command = "npm install && npm run build"
          start_command = "npm start"
          port          = local.container_port
          runtime       = "NODEJS_16"
        }
      }
    }
  }

  health_check_configuration {
    path = "/health"
  }
}

output "service_url" {
  value = aws_apprunner_service.my_drone_service.service_url
}
