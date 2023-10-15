---
title: 'A open source for build service with Go'
slug: {
  vn: "first-opensource-with-go",
  en: "first-opensource-with-go",
  id: "first-opensource-with-go"
}
date: 2023-10-15
description: 'This project allows developers to build services for exporting REST APIs.'
keywords: 'technical, backend, web develop, base, base service, http, golang, code-base, codebase'
tags: ['web', 'coding', 'golang', 'technical', 'backend', 'service', 'codebase', 'http']
image: 'https://res.cloudinary.com/dtmebo99b/image/upload/v1697379815/github/golang_wi6uth.png'
---

### First time
When we built a digital product, we designed system. You must have to decide choose a programing language or some programming language to make this architecture happend. Me too, I know Golang is very strong and powerful to build high performance backend system with fast compiler, strong paralissim process with go-routine and support very strong with blockchain data. Espicialy, we used etherum and binance smart chain node run with geth node. So, we choose Go.

To build some services with golang. We will choose framework to build this, with some idea Gin, Go-micro, Echo, Beego, Go-Chi... However, when I go around these frameworks, I need and must have to append more function in codebase to build service.So, we need use Go-chi (simple router) and build more functions on codebase. Base on it, my teams we can build and deliver specific business service.

Link Github [Here](https://github.com/ngMinhDan/go-base-service). You if like repo and thing it helpful, give me a start because it is free 😀

## Go-Base-Service
In the go-base-service, we have developed features, with more ongoing features:
- [x]  Support for working with configurations (Dev, Production, Default Values)
- [x]  Support for managing logs (Format, Output, Level)
- [x]  Support for database operations (RDBMS, NoSQL)
- [x]  Support for Authentication with JWT (Sample Payload, Create, GetClaims)
- [x]  Support for working with Kafka (Schema, Broker, Consumer)
- [x]  Support for Redis operations (Connect, Get, Set, Invalidate)
- [x]  Support for AWS S3 operations (Connect, Get, Upload)
- [x]  Support for Elasticsearch (Connect, Insert, Search)
- [x]  Support for middleware (Rate Limit, Blocking)
- [x]  Easy integration with HTTP request handling (Status, Response, graceful shutdown)
- [ ]  Support for GRPC
- [ ]  Support for Websocket
- [ ]  Support for Ethereum

## Basic System
I built in this go-base-service, you can use for your goal like User Service, Message Service, Search Service ... Especialy, I think users service have normal functions in production.

- Support standard authentication functions (Sign In, Sign Up, Change Password, Get Profile)
- Support admin functions: Get all users, Block IP, Upgrade role, Rate Limit
- Support sending messages to Kafka brokers and consuming these messages,then inserting them into Elasticsearch
- Support full-text search using Elasticsearch's API
You can import this API collection into Postman as a JSON file using this postman.json file

![Image](https://res.cloudinary.com/dtmebo99b/image/upload/v1697304940/github/base_yrbzf0.png)
## How to Run
To install database, redis, kafka, elasticsearch. I defined in docker-compose.yml. You need run to start app
```text
docker-compose up --build -d
```
Then we run go app with Makefile
```text
make run
```
## Prerequisites
- Go version 1.18

## Contributing or Maintaining
This project may have several issues, although I'm not aware of them at the moment. You can contribute to the go-base-service project by submitting documentation issues and pull requests to the repository.

### Thanks for visting me

---

*Modified: May, 2023*
