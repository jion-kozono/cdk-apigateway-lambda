import {Stack, StackProps, App, aws_lambda_nodejs} from 'aws-cdk-lib';
import {
  Runtime
} from "aws-cdk-lib/aws-lambda";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path'


export interface CustomizedProps extends StackProps {
  projectName: string;
}

export class LambdaWithAPIGatewayStack extends Stack {
  constructor(scope: App, id: string, props?: CustomizedProps) {
    super(scope, id, props);

    const hello = new aws_lambda_nodejs.NodejsFunction(this, "HelloHandler", {
      entry: path.join(__dirname, '../lambda/index.ts'),
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      environment: {
        PROJECT_NAME: props!.projectName
      }
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    const api = new apigateway.RestApi(this, 'sampleApigateway', {
      restApiName: `${props!.projectName}-apigateway`,
    });

     // GET/sample を作成
     const sample = api.root.addResource("sample");
     const courseSearchIntegration = new apigateway.LambdaIntegration(
      hello
     );
     sample.addMethod("GET", courseSearchIntegration);

     // GET/messages/2 などを作成したい場合
     const messages = api.root.addResource("messages");
     const messageId = messages.addResource("{message_id}");
     messageId.addMethod("GET", courseSearchIntegration, {
       apiKeyRequired: false,
     });
  }
}
