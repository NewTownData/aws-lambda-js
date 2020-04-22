import * as path from "path";
import { Stack } from "@aws-cdk/core";
import { Function as LambdaFunction, Runtime, Code } from "@aws-cdk/aws-lambda";
import { ServicePrincipal } from "@aws-cdk/aws-iam";

const LambdaRootDir = path.join(__dirname, "..", "..", "resources");

export default function createLambda(
  stack: Stack,
  name: string,
  file: string
): LambdaFunction {
  const fcn = new LambdaFunction(stack, name, {
    runtime: Runtime.NODEJS_12_X,
    handler: `${file}.handler`,
    code: Code.fromAsset(path.join(LambdaRootDir, file)),
  });
  fcn.grantInvoke(new ServicePrincipal("apigateway.amazonaws.com"));
  return fcn;
}
