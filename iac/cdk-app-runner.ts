import * as cdk from '@aws-cdk/core';
import { CfnService } from '@aws-cdk/aws-apprunner';
import { Effect, PolicyDocument, PoliciyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam'; 

const config = {
    stage: 'dev',
    backend: {
        apprunner_connection_arn: 'GitHub Repo Connection ARN',
        repository_url: 'https://github.com/kaesar/cicddemo'
    }
};

interface AppRunnerStackProps extends cdk.StackProps {
    readonly stage: string;    
}

export class CdkStack extends cdk.Stack {

    constructor(scope: cdk.App, id: string, props?: AppRunnerStackProps) {
        super(scope, id, props);

        const giveReadAccessPolity = new PolicyDocument({
            statements: [
                new PoliciyStatement({
                    resources: ['arn'],
                    actions: ['secretsmanager:GetSecretValue'],
                    effect: Effect.ALLOW
                })
            ]
        });

        const instanceRole = new Role(this, `${props?.stage}-AppRunnerRole`, {
            description: 'Default role for app runner',
            assumeBy: new ServicePrincipal('tasks.apprunner.amazonaws.com'),
            inlinePolicies: {
                GiveReadAccess: giveReadAccessPolity
            }
        });

        const appRunnerService = new CfnService(this, `${props?.stage}-AppRunnerService`, {
            serviceName: `${props?.stage}-AppRunnerService`,
            sourceConfiguration: {
                authenticationConfiguration: {
                    connectionArn: config.backend.apprunner_connection_arn
                },
                autoDeploymentsEnabled: false,
                codeRepository: {
                    repositoryUrl: config.backend.repository_url,
                    sourceCodeVersion: {
                        type: 'BRANCH',
                        value: 'main'
                    },
                    codeConfiguration: {
                        codeConfigurationValues: {
                            buildCommand: 'npm install && npm run build',
                            startCommand: 'npm start',
                            port: '3000',
                            runtime: 'NODEJS_16',
                            //runtimeEnvironmentSecrets: [{ name: '', value: '' }],
                            //runtimeEnvironmentVariables: [{ name: '', value: '' }],
                        },
                        configurationSource: 'API'  // 'REPOSITORY'
                    },
                }
            },
            healthCheckConfiguration: {
                path: '/health'
            },
            instanceConfiguration: {
                instanceRoleArn: instanceRole.roleArn
            }
        });

    }

}
