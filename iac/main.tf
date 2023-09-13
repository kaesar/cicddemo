provider "aws" {
  region = "us-east-1"  # Reemplaza con tu región deseada
}

resource "aws_apprunner_service" "my_drone_service" {
  name          = "my-drone-service"
  source_configuration {
    image_repository {
      image_identifier = "your-docker-image-url"  # Reemplaza con la URL de tu imagen de Docker
    }
  }
}
