provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket                  = "tfstate-demo-2023"
    key                     = "terraform.tfstate"
    region                  = "us-east-1"
    encrypt                 = true
    shared_credentials_file = "./iac/.secretaws"
  }
}

/*resource "aws_iam_policy" "give_image_access_policy" {
  name        = "GiveImageAccessPolicy"
  description = "Policy to allow access to ECR by the service"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        "Effect" : "Allow",
        "Action" : [
          "ecr:*"
        ],
        "Resource" : "arn:aws:ecr:us-east-1:117979987706:*"
      },
    ],
  })
}*/

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

  /*inline_policy {
    name   = "GiveImageAccess"
    policy = aws_iam_policy.give_image_access_policy.policy
  }*/
}

resource "aws_iam_role_policy_attachment" "apprunner_role_policy" {
  role       = aws_iam_role.apprunner_role.arn
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

/*resource "aws_apprunner_service" "my_drone_service" {
  service_name = "MyDroneService"

  source_configuration {
    authentication_configuration {
      connection_arn = "arn:aws:apprunner:us-east-1:117979987706:connection/cicd-repo/d940c059ccdd4466a82f95b50e4cdec3"
    }

    auto_deployments_enabled = false

    code_repository {
      repository_url = "https://github.com/kaesar/cicddemo"
      
      source_code_version {
        type  = "BRANCH"
        value = "main"
      }

      code_configuration {
        configuration_source = "API"

        code_configuration_values {
          build_command = "npm install && npm run build"
          start_command = "npm start"
          port          = "3000"
          runtime       = "NODEJS_16"
        }
      }
    }
  }

  health_check_configuration {
    path = "/health"
  }
}*/

resource "aws_apprunner_service" "my_drone_service" {
  service_name = "MyDroneService"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_role.arn
    }

    auto_deployments_enabled = false

    image_repository {
      image_identifier      = "117979987706.dkr.ecr.us-east-1.amazonaws.com/cicd-hub:v1"
      image_repository_type = "ECR"
      image_configuration {
        port = "3000"
      }
    }
  }

  health_check_configuration {
    path = "/health"
  }

  //instance_configuration {
  //  instance_role_arn = aws_iam_role.apprunner_role.arn
  //}
}

/*resource "aws_ecr_repository" "my_docker_repository" {
  name = "cicd-hub"
}*/
