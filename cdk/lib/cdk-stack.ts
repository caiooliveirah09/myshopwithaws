import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Cognito } from "./cognito";
import { DynamoDB } from "./dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognito = new Cognito(this, "cognito");
    this.addDependency(cognito);

    const dynamodb = new DynamoDB(this, "dynamodb");
    this.addDependency(dynamodb);

    const api = new apigateway.RestApi(this, 'mdfmswaapi',{
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // /products
    const products = api.root.addResource('products');
    // /orders
    const orders = api.root.addResource('orders');

    const getProducts = new lambda.Function(this, "getProducts", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "getProducts.handler",
      environment: {
        TABLE_NAME: dynamodb.table.tableName,
      },
    });
    dynamodb.table.grantReadWriteData(getProducts);
    const getProductsIntegration = new apigateway.LambdaIntegration(getProducts);
    products.addMethod('GET', getProductsIntegration);

    const getOrders = new lambda.Function(this, "getOrders", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "getOrders.handler",
      environment: {
        TABLE_NAME: dynamodb.table.tableName,
      },
    });
    dynamodb.table.grantReadWriteData(getOrders);
    const getOrdersIntegration = new apigateway.LambdaIntegration(getOrders);
    orders.addMethod('GET', getOrdersIntegration);

    const createOrder = new lambda.Function(this, "createOrder", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "createOrder.handler",
      environment: {
        TABLE_NAME: dynamodb.table.tableName,
      },
    });
    dynamodb.table.grantReadWriteData(createOrder);
    const createOrderIntegration = new apigateway.LambdaIntegration(createOrder);
    orders.addMethod('POST', createOrderIntegration);
  }
}
