# Week 6 and 7 — Deploying Containers and solving CORS with a Load Balancer and Custom Domain

## Table of Contents

- [X] Watch ECS Security by Ashish
- [ ] Watch Fargate Technical Questions with Maish (Not yet uploaded)
- [X] Provision ECS Cluster	
- [X] Create ECR repo and push image for backend-flask	
- [X] Deploy Backend Flask app as a service to Fargate	
- [ ] Create ECR repo and push image for fronted-react-js	
- [ ] Deploy Frontend React JS app as a service to Fargate	
- [ ] Provision and configure Application Load Balancer along with target groups	
- [ ] Manage your domain using Route53 via hosted zone	
- [ ] Create an SSL certificate via ACM	
- [ ] Set up a record set for naked domain to point to frontend-react-js	
- [ ] Set up a record set for api subdomain to point to the backend-flask	
- [ ] Configure CORS to only permit traffic from our domain	
- [ ] Secure Flask by not running in debug mode	
- [ ] Implement Refresh Token for Amazon Cognito	
- [ ] Refactor bin directory to be top level	
- [ ] Configure task definitions to contain x-ray and turn on Container Insights
- [ ] Change Docker Compose to explicitly use a user-defined network
- [ ] Create Dockerfile specifically for production use case
- [ ] Using ruby generate out env dot files for docker using erb templates

## Tasks

### Watch ECS Security by Ashish
In this video, I learned about the following:
- ECS Security
- Best practices
- Create a new ECS cluster
- Push image using the CLI
- How to inspect repository using Snyk or AWS Inspector

### Watch Fargate Technical Questions with Maish (Not yet uploaded)

### Provision ECS Cluster
In this task, the following was done:
- Create a new ECS cluster named `cruddur`
- Create a new task definition 
- Create a new service using the CLI
```shell
aws ecs create-cluster \
--cluster-name cruddur \
--service-connect-defaults namespace=cruddur
```

### Create ECR repo and push image for backend-flask

- Create a new ECR repository named `backend-flask`
- Create a new ECR repository named `cruddur`
- Login to ECR using the CLI
- Push the `python:3.10-slim` image to the `cruddur` repository
- Create a new image named `backend-flask` using the `Dockerfile` in the `backend-flask` directory
- Push the `backend-flask` image to the `backend-flask` repository

### Deploy Backend Flask app as a service to Fargate
There are some prerequisites for this task:
-  Create a parameter with the following command
```shell
aws ssm put-parameter --type "SecureString" --name "/cruddur/backend-flask/AWS_ACCESS_KEY_ID" --value $AWS_ACCESS_KEY_ID
aws ssm put-parameter --type "SecureString" --name "/cruddur/backend-flask/AWS_SECRET_ACCESS_KEY" --value $AWS_SECRET_ACCESS_KEY
aws ssm put-parameter --type "SecureString" --name "/cruddur/backend-flask/CONNECTION_URL" --value $PROD_CONNECTION_URL
aws ssm put-parameter --type "SecureString" --name "/cruddur/backend-flask/ROLLBAR_ACCESS_TOKEN" --value $ROLLBAR_ACCESS_TOKEN
aws ssm put-parameter --type "SecureString" --name "/cruddur/backend-flask/OTEL_EXPORTER_OTLP_HEADERS" --value "x-honeycomb-team=$HONEYCOMB_API_KEY"
```
- Create a new file in the `policies` folder named `service-assume-role-execution-policy.json`
- Run the Execution role
```shell
aws iam create-role --role-name CruddurServiceExecutionPolicy --assume-role-policy-document "file://aws/policies/service-assume-role-execution-policy.json"
```
- Create a Role in the console by going to IAM > Roles, and attach an inline policy to `CruddurServiceExecutionRole` using the `CruddurServiceExecutionPolicy`
- Create a task by using the CLI:
```shell
aws iam create-role \
    --role-name CruddurTaskRole \
    --assume-role-policy-document "{
  \"Version\":\"2012-10-17\",
  \"Statement\":[{
    \"Action\":[\"sts:AssumeRole\"],
    \"Effect\":\"Allow\",
    \"Principal\":{
      \"Service\":[\"ecs-tasks.amazonaws.com\"]
    }
  }]
}"
```
```shell
aws iam put-role-policy \
  --policy-name SSMAccessPolicy \
  --role-name CruddurTaskRole \
  --policy-document "{
  \"Version\":\"2012-10-17\",
  \"Statement\":[{
    \"Action\":[
      \"ssmmessages:CreateControlChannel\",
      \"ssmmessages:CreateDataChannel\",
      \"ssmmessages:OpenControlChannel\",
      \"ssmmessages:OpenDataChannel\"
    ],
    \"Effect\":\"Allow\",
    \"Resource\":\"*\"
  }]
}
"
```
```shell
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess --role-name CruddurTaskRole
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess --role-name CruddurTaskRole
```

- Create a new task definition named `backend-flask` using the `backend-flask.json` file in `aws/task-definitions`
- Create a new service named `backend-flask` using the `backend-flask-service.json` file in `aws/services`
- Create a security group using the following commands:
```shell

export DEFAULT_VPC_ID=$(aws ec2 describe-vpcs \
--filters "Name=isDefault, Values=true" \
--query "Vpcs[0].VpcId" \
--output text)
echo $DEFAULT_VPC_ID

export DEFAULT_SUBNET_IDS=$(aws ec2 describe-subnets  \
 --filters Name=vpc-id,Values=$DEFAULT_VPC_ID \
 --query 'Subnets[*].SubnetId' \
 --output json | jq -r 'join(",")')
echo $DEFAULT_SUBNET_IDS

export CRUD_SERVICE_SG=$(aws ec2 create-security-group \
  --group-name "crud-srv-sg" \
  --description "Security group for Cruddur services on ECS" \
  --vpc-id $DEFAULT_VPC_ID \
  --query "GroupId" --output text)
echo $CRUD_SERVICE_SG
```
- Add policy to `CruddurServiceExecutionRole` `CloudWatchFullAccess`
- 