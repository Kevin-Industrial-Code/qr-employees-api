#!/bin/bash

docker compose stop
docker rm qr-coats-app
docker image rm qr-employees-api-nestjs-app
docker compose up -d
docker logs --follow qr-coats-app