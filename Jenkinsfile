pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_REGION = 'us-east-1'  // Cambia a tu región deseada
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build('nombre-de-tu-imagen-docker:latest', '-f ruta-a-tu-Dockerfile .')
                    dockerImage.push()
                }
            }
        }

        stage('Deploy with Terraform') {
            steps {
                sh 'cd iac'
                sh 'terraform init'
                sh 'terraform apply -auto-approve'
            }
        }

        stage('Deploy to AWS App Runner') {
            steps {
                script {
                    sh 'aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
                    sh 'aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'
                    sh 'aws configure set region $AWS_REGION'

                    sh 'aws apprunner create-service --service-name MyDroneService --source-configuration file://source-configuration.json'
                }
            }
        }
    }

    post {
        always {
            // Limpieza o tareas de finalización si es necesario
        }
    }
}
