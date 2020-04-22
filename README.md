# Example AWS HTTP API with Javascript Lambda

An example AWS CDK stack that deploys HTTP API with Javascript Lambda.

The AWS CDK stack is at `cdk` folder.

Javascript Lambda code is at `lambda` folder.

## Environment Set Up

Please, follow Getting Started guide at https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html to set up your environment.

## Build & Deploy

### Lambda

 * Go to `lambda` folder
 * Run `npm install`
 * Run `npm run build` to build the lambda source code

### Stack

 * Go to `cdk` folder
 * Run `npm install`
 * Run `npm run build`
 * Run `npm run cdk deploy`

## Testing the Deployment

 * Run `curl https://<HTTP API>.execute-api.<AWS Region>.amazonaws.com/v1/ping`
 * You can find the exact URL as the `PingURL` stack output variable

## Removal of the Stack

 * Run `npm run cdk destroy`

## License

Apache License, Version 2.0. See [LICENSE.txt](LICENSE.txt) for more details.

Copyright 2020 New Town Data Ltd, https://www.newtowndata.com/
