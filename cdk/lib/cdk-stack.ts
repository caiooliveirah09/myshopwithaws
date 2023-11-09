import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cognito } from './cognito';
import { DynamoDB } from './dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognito = new Cognito(this, 'cognito');
    this.addDependency(cognito);

    const dynamodb = new DynamoDB(this, 'dynamodb');
    this.addDependency(dynamodb);

    const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'), 
      handler: 'index.handler', 
      environment: {
      TABLE_NAME: dynamodb.table.tableName,
      },
    });

    dynamodb.table.grantReadWriteData(lambdaFunction);


    /*const api = new apigateway.RestApi(this, 'MyApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });
    
    const myLambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction);
    const resource = api.root.addResource('myresource');
    resource.addMethod('GET', myLambdaIntegration);
    */
    
  }
}
