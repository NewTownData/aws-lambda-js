import { Stack, Construct, StackProps, CfnOutput } from "@aws-cdk/core";
import { CfnApi, CfnStage, CfnDeployment } from "@aws-cdk/aws-apigatewayv2";
import createLambda from "./utils/createLambda";
import addRestRoute from "./utils/addRestRoute";

const StageName = "v1";

export class RestLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const apiPrefix = (props?.stackName ?? "rest-lambda")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    const pingFcn = createLambda(this, "Ping", "ping");

    const restApi = new CfnApi(this, "RestApi", {
      protocolType: "HTTP",
      name: `${apiPrefix}-rest-api`,
    });

    const routes = [
      addRestRoute({
        api: restApi,
        lambda: pingFcn,
        name: "Ping",
        method: "GET",
        path: "/ping",
      }),
    ];

    const restDeployment = new CfnDeployment(
      this,
      `RestDeployment${StageName}`,
      {
        apiId: restApi.ref,
        description: `For stage ${StageName}`,
      }
    );

    routes.forEach((route) => {
      restDeployment.addDependsOn(route);
    });

    new CfnStage(this, "RestStage", {
      apiId: restApi.ref,
      stageName: StageName,
      deploymentId: restDeployment.ref,
    });

    new CfnOutput(this, "PingURL", {
      value: `https://${restApi.ref}.execute-api.${this.region}.amazonaws.com/${StageName}/ping`,
    });
  }
}
