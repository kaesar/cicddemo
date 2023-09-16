pipeline {
    agent { dockerfile true }
    stages {
        stage('Demo Agent Pipeline') {
            steps {
                sh '''
                  node -v
                  git -v
                  curl --version
                '''
            }
        }
    }
}