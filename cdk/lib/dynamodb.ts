import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DynamoDB extends cdk.Stack {
  public readonly table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.table = new cdk.aws_dynamodb.Table(this, 'MyTable', {
      partitionKey: {
        name: 'PK#',
        type: cdk.aws_dynamodb.AttributeType.STRING, 
      },
      sortKey: {
        name: 'SK#', 
        type: cdk.aws_dynamodb.AttributeType.STRING, 
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }

}