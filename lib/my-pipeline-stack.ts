import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./my-pipeline-app-stage";

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "MyPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("westlag114/my-pipeline", "main", {
          authentication: cdk.SecretValue.secretsManager(
            "github-access-token-secret"
          ),
        }),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    pipeline.addStage(
      new MyPipelineAppStage(this, "test", {
        env: {
          account: "150558808264",
          region: "us-east-2",
        },
      })
    );
  }
}
