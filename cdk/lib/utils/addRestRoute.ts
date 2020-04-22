import { Function as LambdaFunction } from "@aws-cdk/aws-lambda";
import { CfnApi, CfnIntegration, CfnRoute } from "@aws-cdk/aws-apigatewayv2";

export default function addRestRoute(
  api: CfnApi,
  fcn: LambdaFunction,
  name: string,
  route: string
): CfnRoute {
  const integration = new CfnIntegration(api.stack, `${name}Integration`, {
    apiId: api.ref,
    integrationType: "AWS_PROXY",
    integrationUri: `arn:aws:apigateway:${api.stack.region}:lambda:path/2015-03-31/functions/${fcn.functionArn}/invocations`,
    payloadFormatVersion: "2.0",
  });

  return new CfnRoute(api.stack, `${name}Route`, {
    apiId: api.ref,
    routeKey: route,
    authorizationType: "NONE",
    operationName: name,
    target: `integrations/${integration.ref}`,
  });
}
