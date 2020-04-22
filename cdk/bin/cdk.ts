#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { RestLambdaStack } from "../lib/RestLambdaStack";

const app = new cdk.App();
new RestLambdaStack(app, "RestLambdaStack");
