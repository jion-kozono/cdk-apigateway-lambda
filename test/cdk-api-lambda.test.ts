import * as cdk from "aws-cdk-lib";
import { LambdaWithAPIGatewayStack } from "../lib/lambda-with-api-stack";
import { Template } from "aws-cdk-lib/assertions";

test("snapshot test", () => {
  const app = new cdk.App();

  // cdk.jsonをテスト時に使用したい場合
  // const app = new cdk.App({ context: { hoge: "fuga" } });

  const stack = new LambdaWithAPIGatewayStack(app, "snapshotTestStack", {
    projectName: "snapshot-test",
  });

  // テンプレートをJSONに変換
  const template = Template.fromStack(stack).toJSON();

  // Lambdaコードの変更によるsnapshotテスト失敗を防ぐ
  template.Parameters = {};
  Object.values(template.Resources).forEach((resource: any) => {
    // Codeを持つもののCodeを{}に上書き
    if (resource?.Properties?.entry) {
      resource.Properties.Code = {};
    }
  });

  expect(template).toMatchSnapshot();
});
