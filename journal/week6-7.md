# Week 6 and 7 — Deploying Containers and solving CORS with a Load Balancer and Custom Domain

## Table of Contents

- [X] Watch ECS Security by Ashish
- [ ] Watch Fargate Technical Questions with Maish (Not yet uploaded)
- [ ] Provision ECS Cluster	
- [ ] Create ECR repo and push image for backend-flask	
- [ ] Deploy Backend Flask app as a service to Fargate	
- [ ] Create ECR repo and push image for fronted-react-js	
- [ ] Deploy Frontend React JS app as a service to Fargate	
- [ ] Provision and configure Application Load Balancer along with target groups	
- [ ] Manage your domain using Route53 via hosted zone	
- [ ] Create an SSL certificate via ACM	
- [ ] Setup a record set for naked domain to point to frontend-react-js	
- [ ] Setup a record set for api subdomain to point to the backend-flask	
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