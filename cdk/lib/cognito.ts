import * as cognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';

export class Cognito extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly userPoolDomain: cognito.UserPoolDomain;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'userPool', {
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
      userPoolName: 'my-shop-with-aws-user-pool',
      passwordPolicy: {
        requireDigits: true,
        requireLowercase: true,
        requireSymbols: true,
        requireUppercase: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY, 
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.userPoolClient = new cognito.UserPoolClient(this, 'userPoolClient', {
      userPool: this.userPool,
      generateSecret: false,
      authFlows: { userPassword: true, userSrp: true },
    });

    this.userPoolDomain = new cognito.UserPoolDomain(this, 'userPoolDomain', {
      userPool: this.userPool,
      cognitoDomain: {
        domainPrefix: 'mdfmswa',
      },
    });
  }
}