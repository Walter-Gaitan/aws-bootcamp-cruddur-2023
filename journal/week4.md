# Week 4 — Postgres and RDS

## Overview

This week we will be learning about Postgres and RDS. We will be using Amazon RDS to create a Postgres database. We will then use the AWS Amplify library to connect to the database and perform CRUD operations. They are going to be some implementations such as:
- Create a CRUD application using AWS
- Use lambda functions to perform CRUD operations
- Use DynamoDB to store data
- Use S3 to store images
- Connect to a postgres database using AWS RDS

## Requirements

- [X] Amazon RDS Postgres Database
- 
## Tasks

### Security Considerations for RDS

First we follow the video published by Ashish on [Securing your Amazon RDS Postgres](https://www.youtube.com/watch?v=UourWxz7iQg&list=PLBfufR7vyJJ7k25byhRXJldB5AiwgNnWv&index=46) and learned about typed of RDS, why companies use Amazon RDS, how to create one and how to secure it.

To create a RDS instance we need to follow the next steps:
- Go to the RDS service
- Click on `Create database`
- Select `Easy Create`
- Select `PostgreSQL`
- Generate a password
- Click on `Create database`

> **Important Note:** There are certain things that we need to take into account when creating a database.

- Make sure that the region is the same as the one you are using for the rest of the services. In this case, we are using `us-east-2`.
- It is also important to select the `Free tier` option, because it is the only one that allows us to create a database without paying. 
- Make your database publicly accessible, because it is not a good practice to do it. However, it is necessary to do it for this project.
- Finally, make sure that you have a VPC with two subnets in different AZ, and also a security group created, because you will need to select it when creating the database.

![RDS](../_docs/assets/rds.png)

Using the `Easy Create` option, we can create a database in a few minutes. However, it is not the best option because it does not allow us to customize the database. For example, we cannot change the storage type, the storage size, the database name, the port, the database version, etc. If we want to customize the database, we need to use the `Standard Create` option.

For the security groups, it is necessary to change the default one, because it allows all the traffic. We need to create a new one and select the following options:
- Type: `PostgreSQL`
- Protocol: `TCP`
- Port Range: `5432`
- Source: `My IP`

![Security Group](../_docs/assets/security_group.png)

Finally, to connect with the database, I am using `DBeaver`. It is a free and open source database management tool. It allows us to connect to different databases such as MySQL, PostgreSQL, Oracle, SQL Server, etc. To connect to the database, we need to follow the next steps:
- Click on `New Connection`
- Select `PostgreSQL`
- Select `database-1` as the database
- Paste the endpoint on the `Host` field
- Click on test connection

Once you are done with the connection, remember to delete the database, because it is not a good practice to leave it publicly accessible, and it is not free.

Since there is no data on the database, no snapshot is created. So the options selected are as shown below:
![Delete Database](../_docs/assets/delete_database.png)