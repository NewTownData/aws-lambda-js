import { Function as LambdaFunction } from "@aws-cdk/aws-lambda";
import { CfnApi, CfnIntegration, CfnRoute } from "@aws-cdk/aws-apigatewayv2";
import { ServicePrincipal } from "@aws-cdk/aws-iam";

export interface IRestRouteOptions {
  readonly api: CfnApi;
  readonly lambda: LambdaFunction;
  readonly name: string;
  readonly method: "GET" | "POST" | "PUT" | "DELETE";
  readonly path: string;
}

function addIntegration(options: IRestRouteOptions): CfnIntegration {
  const { api, name, lambda } = options;
  return new CfnIntegration(api.stack, `${name}Integration`, {
    apiId: api.ref,
    integrationType: "AWS_PROXY",
    integrationUri: `arn:aws:apigateway:${api.stack.region}:lambda:path/2015-03-31/functions/${lambda.functionArn}/invocations`,
    payloadFormatVersion: "2.0",
  });
}

function addRoute(
  options: IRestRouteOptions,
  integration: CfnIntegration
): CfnRoute {
  const { api, name, method, path } = options;
  return new CfnRoute(api.stack, `${name}Route`, {
    apiId: api.ref,
    routeKey: `${method} ${path}`,
    operationName: name,
    target: `integrations/${integration.ref}`,
    authorizationType: "NONE",
  });
}

function addLambdaPermissions(options: IRestRouteOptions): void {
  const { api, name, lambda, method, path } = options;

  if (path.indexOf("/") !== 0) {
    throw new Error("httpPath must start with /");
  }

  lambda.addPermission(`${name}Permission`, {
    principal: new ServicePrincipal("apigateway.amazonaws.com"),
    action: "lambda:InvokeFunction",
    sourceArn: `arn:aws:execute-api:${api.stack.region}:${api.stack.account}:${api.ref}/*/${method}${path}`,
  });
}

export default function addRestRoute(options: IRestRouteOptions): CfnRoute {
  addLambdaPermissions(options);

  const integration = addIntegration(options);
  return addRoute(options, integration);
}
