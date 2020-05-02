#!/usr/bin/env node
import "source-map-support/register";
import { RestLambdaStack } from "../lib/RestLambdaStack";
import { App } from "@aws-cdk/core";

const app = new App();
new RestLambdaStack(app, "RestLambdaStack");
