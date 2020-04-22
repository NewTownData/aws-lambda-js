import { App } from "@aws-cdk/core";
import "@aws-cdk/assert/jest";
import { RestLambdaStack } from "../lib/RestLambdaStack";

test("Rest Lambda Stack", () => {
  const app = new App();
  const stack = new RestLambdaStack(app, "MyTestStack");

  expect(stack).toHaveResourceLike("AWS::Lambda::Function");
  expect(stack).toHaveResourceLike("AWS::ApiGatewayV2::Api");
  expect(stack).toHaveResourceLike("AWS::ApiGatewayV2::Stage");

  expect(stack).toHaveOutput({
    outputName: "PingURL",
    outputValue: {
      "Fn::Join": [
        "",
        [
          "https://",
          {
            Ref: "RestApi",
          },
          ".execute-api.",
          {
            Ref: "AWS::Region",
          },
          ".amazonaws.com/v1/ping",
        ],
      ],
    },
  });
});
