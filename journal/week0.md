# Week 0 — Billing and Architecture

## Overview

This week we will be setting up our AWS account and getting familiar with the AWS console. We will also be setting up our project repository and getting familiar with the project codebase.

## Requirements

- [X] Create an AWS account
- [X] Create an AWS IAM user
- [X] Create a Github repository
- [X] Create a Gitpod workspace
- [X] Setup a lucidchart account
- [X] Create a lucidchart diagram of the project logical architecture
- [X] Create a Honeycomb account
- [X] Create a Rollbar account

## Tasks

### Create an AWS account

Once the account is created we need to create an IAM user. This user will be used to access the AWS console and to deploy our application.
Add the user to the `AdministratorAccess` group and create an access key for the user. Save the access key and secret key in a secure location.
Once it is created, we will need to configure the AWS CLI with the access key and secret key.
![AWS IAM User](../_docs/assets/iam-user.png)

After that we also need to create a billing alarm. This will send us an email when our account reaches a certain threshold. I am setting two different ones, the first one to alert me when I exceed the free tier, and the other one to not exceed the $100 treshold since I have some credits but they shouldn't exceed that amount.
![AWS Billing Alarm](../_docs/assets/billing.png)

### Create a Github repository

I already have a Github account so I just need to create a new repository from the template. I will be using the template that was provided by the instructor. You can find it [here](https://github.com/ExamProCo/aws-bootcamp-cruddur-2023).

### Create a Gitpod workspace

I already have a Gitpod account so I just need to create a new workspace from the repository that I just created.
![Gitpod Workspace](../_docs/assets/gitpod.png)

### Setup a lucidchart account

I already have a lucidchart account so I just need to create a new diagram and start adding the components of the project.

### Create a lucidchart diagram of the project logical architecture

I created a diagram of the logical architecture of the project. You can find it in the [following link](https://lucid.app/documents/view/c8bd3f89-0566-420a-baad-8387c20bd052).
![Logical Architecture](../_docs/assets/logical-architecture.png)

### Create a Honeycomb account

I created a Honeycomb account and created a workspace for the project called walterg.steven-gettingstarted.

### Create a Rollbar account

I created a Rollbar account using my Github account. After that I will just wait for further instructions. 