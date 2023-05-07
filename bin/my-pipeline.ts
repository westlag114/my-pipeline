#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MyPipelineStack } from "../lib/my-pipeline-stack";

const app = new cdk.App();
new MyPipelineStack(app, "MyPipelineStack", {
  env: {
    account: "150558808264",
    region: "us-east-2",
  },
});

app.synth();
