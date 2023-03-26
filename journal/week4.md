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
- [X] Postgres installed on the CLI
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

### Create a CRUD application using AWS

Following the session for the Week 4, we start by creating a RDS using the CLI. To do so, we need to follow the next steps:
- Create a VPC
- Create a subnet group
- Create a security group
- Create an RDS instance

To create a VPC, we need to follow the next steps:
- If you do not have a default VPC, just run the following command:
```bash
aws ec2 create-default-vpc
```
- Once you run the command, default subnets will also be created. To check if the default VPC was created, run the following command:
```bash
aws ec2 describe-vpcs
```

To create a subnet group, we need to follow the next steps:
- Run the following command:
```bash
aws rds create-db-subnet-group --db-subnet-group-name subnet-group-1 --db-subnet-group-description "Subnet group 1" --subnet-ids subnet-0a1b2c3d4e5f6g7h8 subnet-0a1b2c3d4e5f6g7h9
```
- To check if the subnet group was created, run the following command:
```bash
aws rds describe-db-subnet-groups
```

To create an RDS instance, we need to follow the next steps:
- Run the following command:
```bash
aws rds create-db-instance \
  --db-instance-identifier cruddur-db-instance \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version  14.6 \
  --master-username root \
  --master-user-password ${MASTER_PASSWORD} \
  --allocated-storage 20 \
  --availability-zone us-east-2a \
  --backup-retention-period 0 \
  --port 5432 \
  --no-multi-az \
  --db-name cruddur \
  --storage-type gp2 \
  --publicly-accessible \
  --storage-encrypted \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --no-deletion-protection
```

For security reasons, I am not going to show the password. However, you can use your own password. To add the password without modifying the command, you can run the following command in the CLI:
```bash
export MASTER_PASSWORD=your_password
gp env MASTER_PASSWORD=your_password
```

- To check if the RDS instance was created, run the following command:
```bash
aws rds describe-db-instances
```

In previous weeks, postgres was already set up. However, if not, it is necessary to go to the docker-compose and add the following lines:
```yaml
  db:
    image: postgres:13.5-alpine
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: postgres
    volumes:
      - ./db:/var/lib/postgresql/data
```

To avoid spending in the RDS, we need to stop it temporarily. To do so, we need to follow the next steps:
- Go to your RDS instance
- Click on `Actions`
- Click on `Stop Temporarily`
- Acknowledge the message
![Stop RDS](../_docs/assets/stop_rds.png)

To connect to the local database, we need to follow the next steps:
- Run the docker-compose
- Run the following command:
```bash
psql -Upostgres --host localhost
```
- Create the database
```sql
CREATE DATABASE cruddur;
```
- Use the command `\l` to show the databases
- Add schema to `schema.sql` file inside the `db` folder
```sql
CREATE TABLE public.users (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  display_name text,
  handle text,
  cognito_user_id text,
  created_at TIMESTAMP default current_timestamp NOT NULL
);

CREATE TABLE public.activities (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  message text NOT NULL,
  replies_count integer DEFAULT 0,
  reposts_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  reply_to_activity_uuid integer,
  expires_at TIMESTAMP,
  created_at TIMESTAMP default current_timestamp NOT NULL
);
```

### Create scripts to set up and create the database

To create the scripts, we need to follow the next steps:
- Create a folder called `bin`
- Create the files `db-create`, `db-drop`, `db-schema-load`
- Copy the content of the files from the repository
- Finally, create a file called `db-setup` to run the scripts in the correct order

### Add a schema to the database

To add a schema to the database, we need to follow the next steps:
- Create a folder called `db`
- Create a file called `schema.sql`
- Add the following content:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.activities;


CREATE TABLE public.users (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  display_name text,
  handle text,
  cognito_user_id text,
  created_at TIMESTAMP default current_timestamp NOT NULL
);

CREATE TABLE public.activities (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_uuid UUID NOT NULL,
  message text NOT NULL,
  replies_count integer DEFAULT 0,
  reposts_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  reply_to_activity_uuid integer,
  expires_at TIMESTAMP,
  created_at TIMESTAMP default current_timestamp NOT NULL
);
```
- Add a new folder called `db` to store `db.py` and `cognito_jwt_token.py`
- Modify the `app.py` file and `home_activities.py` file to use the database

### Connect to the local database

To connect to the local database, we need to follow the next steps:
- Run the docker-compose
- Run db-setup by using the following command:
```bash
cd backend-flask && ./bin/db-setup
```
- Connect to the database by using the following command:
```bash
./bin/db-connect
```
The following image shows the result of the command:
![Connect to the database](../_docs/assets/connect_to_db.png)

### Create an SG rule to allow access to the production database
- Go to the security group of the RDS instance
- Click on `Inbound`
- Click on `Edit`
- Click on `Add Rule`
- Add the following rule: `Type: Postgres, Source: My IP`
- Click on `Save Rules`
- Click on `Close`
![Add rule to the SG](../_docs/assets/add_rule_to_sg.png)
- Create an `rds-update-sg-rule` in `bin` folder to update the security group rule
- Add the following content to the file:
```bash
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="rds-update-sg-rule"
printf "${CYAN}==== ${LABEL}${NO_COLOR}\n"

aws ec2 modify-security-group-rules \
    --group-id $DB_SG_ID \
    --security-group-rules "SecurityGroupRuleId=$DB_SG_RULE_ID,SecurityGroupRule={Description=GITPOD,IpProtocol=tcp,FromPort=5432,ToPort=5432,CidrIpv4=$GITPOD_IP/32}"
```
- Add the following content to the `db-connect` file:
```bash
#! /usr/bin/bash
if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

psql $URL
```

With this, you should be able to connect to the production database and if it doesn't work, connect to the local development database.

### Create a post-confirmation lambda function

First, we need to create a lambda function to add the user to the database. To do so, we need to follow the next steps:
- Go to the AWS console
- Click on `Lambda`
- Click on `Create function`
- Click on `Author from scratch`
- Select `Python 3.8` as the runtime
- Create a file named `lambda_post_confirmation.py` in the `aws/lambda` folder
- Add the following code:
```python
import json
import psycopg2
import os

def lambda_handler(event, context):
    user = event['request']['userAttributes']
    print('userAttributes')
    print(user)

    user_display_name  = user['name']
    user_email         = user['email']
    user_handle        = user['preferred_username']
    user_cognito_id    = user['sub']
    try:
      print('entered-try')
      sql = f"""
         INSERT INTO public.users (
          display_name, 
          email,
          handle, 
          cognito_user_id
          ) 
        VALUES(%s,%s,%s,%s)
      """
      print('SQL Statement ----')
      print(sql)
      conn = psycopg2.connect(os.getenv('CONNECTION_URL'))
      cur = conn.cursor()
      params = [
        user_display_name,
        user_email,
        user_handle,
        user_cognito_id
      ]
      cur.execute(sql,*params)
      conn.commit() 

    except (Exception, psycopg2.DatabaseError) as error:
      print(error)
    finally:
      if conn is not None:
          cur.close()
          conn.close()
          print('Database connection closed.')
    return event
```
- Copy the content of the `lambda_post_confirmation.py` file to the AWS console
- Click on `Deploy`
- Click on `Configuration` and then `Environment variables`
- Add the following environment variables:
  - `CONNECTION_URL`: `postgres://postgres:postgres@localhost:5432/cruddur`
- Click on `Save`
- Click on `Add trigger`
- Click on `Permissions`
- Click on `Role name`
- Click on `Add Permissions` and then `Attach policies`
- Add the following policy `AWSLambdaVPCAccessExecutionRole`
- Create a new policy by clicking on `Create policy`
- Click on `JSON`
- Add the following content:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeNetworkInterfaces",
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
              "ec2:AttachNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}
```
- Click on `Review policy`
- Add a name and a description
- Click on `Create policy`
![Create policy](../_docs/assets/create_policy.png)
- Attach the new policy to the lambda function
- Add a lambda layer
- Select Specify an ARN
- Add the following ARN: `arn:aws:lambda:us-east-2:770693421928:layer:psycopg2-py38:1`
- In `Configuration`, select `VPC` and add the lambda function to the same VPC as the RDS instance, the same subnets and the same security group
![Add lambda to the VPC](../_docs/assets/add_lambda_to_vpc.png)

### Add Lambda trigger to the Cognito user pool
- Click on `Cognito`
- Click on `Manage User Pools`
- Click on `cruddur`
- Click on `User pool properties`
- Click on `Add a Lambda trigger`
- Select `Post confirmation`
- Select `lambda_post_confirmation`
- Click on `Save triggers`

### Create new activities with a database insert

To create new activities, we need to follow the next steps:
- Go to `backend-flask/services`
- Modify the `home_activities.py` file to use the database
- Modify the `create_activity` function to use the database
- Modify `db/db.py` and refactor it

### Modify the lambda function 
- Modify the `cruddur_post_confirmation.py` file to use the database with the following code:
```python
import json
import psycopg2
import os

def lambda_handler(event, context):
    user = event['request']['userAttributes']
    print('userAttributes')
    print(user)

    user_display_name  = user['name']
    user_email         = user['email']
    user_handle        = user['preferred_username']
    user_cognito_id    = user['sub']
    try:
      print('entered-try')
      sql = f"""
         INSERT INTO public.users (
          display_name, 
          email,
          handle, 
          cognito_user_id
          ) 
        VALUES(%s,%s,%s,%s)
      """
      print('SQL Statement ----')
      print(sql)
      conn = psycopg2.connect(os.getenv('CONNECTION_URL'))
      cur = conn.cursor()
      params = [
        user_display_name,
        user_email,
        user_handle,
        user_cognito_id
      ]
      cur.execute(sql,*params)
      conn.commit() 

    except (Exception, psycopg2.DatabaseError) as error:
      print(error)
    finally:
      if conn is not None:
          cur.close()
          conn.close()
          print('Database connection closed.')
    return event
```
- This one is optional, but to make it more aligned with my repository, there is one line in `app.py` that needs to be modified in line 209:
```python
  user_handle  = 'andrewbrown'
```
- Change it to:
```python
  user_handle  = user['preferred_username']
```
This will make sure that the user handle is the one used in the Cognito user pool.
- After making all necessary changes, it is time to try our first CruDDur activity. To do so, we need to follow the next steps:
- Sign in to the application
- Click on `Crud`
- Post any message in the `What would you like to say?` field
![Create activity](../_docs/assets/create_activity.png)

## Homework

For this week homework, I decided to watch the following content:
- [you need to learn SQL RIGHT NOW!! (SQL Tutorial for Beginners)](https://www.youtube.com/watch?v=xiUTqnI6xk8)
- I also decided to take the course [Unit: Intro to SQL: Querying and managing data
  ](https://www.khanacademy.org/computing/computer-programming/sql) from Khan Academy. I learned a lot from this course, mostly because I was able to practice SQL queries and I was able to see the results in real time. I also learned how to use the `JOIN` statement, which is very useful when you need to query data from multiple tables.

