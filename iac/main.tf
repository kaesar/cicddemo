provider "aws" {
  region = "us-east-1"  # Reemplaza con tu región deseada
}

resource "aws_iam_policy" "give_read_access_policy" {
  name        = "GiveReadAccessPolicy"
  description = "Policy to allow read access to secrets manager"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = "secretsmanager:GetSecretValue",
        Effect   = "Allow",
        Resource = "arn:aws:secretsmanager:us-east-1:123456789012:secret:your-secret-name-*",
      },
    ],
  })
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
          Service = "tasks.apprunner.amazonaws.com",
        },
      },
    ],
  })

  inline_policy {
    name        = "GiveReadAccess"
    policy_json = aws_iam_policy.give_read_access_policy.json
  }
}

resource "aws_apprunner_service" "my_drone_service" {
  service_name = "MyDroneService"

  source_configuration {
    authentication_configuration {
      connection_arn = "GitHub Repo Connection ARN"
    }

    auto_deployments_enabled = false

    code_repository {
      repository_url = "https://github.com/kaesar/democicd"
      source_code_version {
        type  = "BRANCH"
        value = "main"
      }
      code_configuration {
        configuration_source = "API"  # 'REPOSITORY'
      }
    }
  }

  health_check_configuration {
    path = "/health"
  }

  instance_configuration {
    instance_role_arn = aws_iam_role.apprunner_role.arn
  }
}

/*resource "aws_apprunner_service" "my_drone_service" {
  service_name = "MyDroneService"
  source_configuration {
    image_repository {
      image_identifier = "your-docker-image-url"  # Reemplaza con la URL de tu imagen de Docker
    }
  }
}*/