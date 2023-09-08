import { App, Stack } from "npm:aws-cdk-lib";
import * as dynamodb from "npm:aws-cdk-lib/aws-dynamodb";
import * as elb from "npm:aws-cdk-lib/aws-elasticloadbalancingv2";
import * as ec2 from "npm:aws-cdk-lib/aws-ec2";

const app = new App();

const stack = new Stack(app, "MyStack");

const table = new dynamodb.Table(stack, "MyTable", {
  partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
});


// BUG: You can't click to the definition of the addGlobalSecondaryIndex method.
table.addGlobalSecondaryIndex({
  indexName: "gsi",
  partitionKey: { name: "gsipk", type: dynamodb.AttributeType.STRING },
  sortKey: { name: "gsisk", type: dynamodb.AttributeType.STRING },
});



// BUG: You can't get auto-completions from `table`.
// Try using autocompletion to get the table name with `table.tableName`




const alb = new elb.ApplicationLoadBalancer(stack, "MyALB", {
  vpc: new ec2.Vpc(stack, "MyVpc"),
});

// BUG: The IDE is confused and thinks I'm running MediaQueryList.addListener
// even though I'm using the AWS CDK's ApplicationLoadBalancer's addListener method.
alb.addListener("MyListener", {
  port: 80,
  defaultAction: elb.ListenerAction.fixedResponse(200),
});

app.synth();