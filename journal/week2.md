# Week 2 — Distributed Tracing

## Overview

In this week we will be looking at distributed tracing. We will be looking at how to trace a request through a distributed system, and how to use tracing to debug a distributed system. 

## Requirements

[X] Have a Honeycomb account
[] Xray installed on your machine
[] Setup AWS CLoudwatch on the application

## Tasks

### Task 1 — Setup Honeycomb

First we need to create a Honeycomb account. You can do this by going to [Honeycomb](https://ui.honeycomb.io/signup) and signing up. You can also follow the video from [GiftedLane](https://www.youtube.com/watch?v=7IwtVLfSD0o&list=PLBfufR7vyJJ7k25byhRXJldB5AiwgNnWv&index=11) to get started.

After doing that, in the main page you will see in the left panel a section called 'Environments'. Click on the 'Add environment' button and add a new environment. You can name it whatever you want, but I will be using 'Bootcamp' for this example.
![Environment](../_docs/assets/environment.png)

After that, in the Home page, you will see your API key. Copy it and save it somewhere, you will need it later. Below that you will also see the instructions to install the Honeycomb agent. We will be using the Python agent, since we are using Flask as backend. You can follow the instructions in the video to install the agent or refer to the Week 2 documentation from the [Bootcamp repository](https://github.com/omenking/aws-bootcamp-cruddur-2023/blob/week-2/journal/week2.md).

Once everything is installed, you can start the application and make a request to it. You should see the request in the Honeycomb dashboard.
![Request](../_docs/assets/request.png)

Then we need to perform a query to get traces. Click on `New Query` and then select `COUNT DISTINCT` in the Visualize section and `trace.trace_id` in the Group By section. You should see something like this after you run the query.
![Query](../_docs/assets/query.png)

After doing that, if you go to the Traces section, you will see the traces for the request you just made. You can click on the trace and see the details of the request.
![Trace](../_docs/assets/trace.png)

### Task 2 — Setup Xray

We need to make sure that Xray is installed in the program. You can follow the instructions in the Week 2 documentation from the [Bootcamp repository](https://github.com/omenking/aws-bootcamp-cruddur-2023/blob/week-2/journal/week2.md).

In my case, instead of using:
```shell
export AWS_REGION="ca-central-1"
gp env AWS_REGION="ca-central-1"
```

I used
```shell
export AWS_REGION="us-east-2"
gp env AWS_REGION="us-east-2"
```


## Homework

## References