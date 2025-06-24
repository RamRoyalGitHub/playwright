pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/RamRoyalGitHub/playwright/'
            }
        }
        stage('Install') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Test') {
            steps {
                bat 'npx playwright test --project="chromium"'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/allure-report/**'
        }
    }
}