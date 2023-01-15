#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaWithAPIGatewayStack } from '../lib/lambda-with-api-stack';


const app = new cdk.App();

const projectName: string = "sample-lambda";

new LambdaWithAPIGatewayStack(app, "LambdaWithAPIGatewayStack", {
  projectName: projectName,
});
