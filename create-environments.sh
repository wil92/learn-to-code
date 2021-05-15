#!/bin/bash

echo "Creating environment"

echo "DB_HOST=$DB_HOST" > .env
echo "DB_PORT=$DB_PORT" >> .env
echo "DB_NAME=$DB_NAME" >> .env
echo "REDIS_HOST=$REDIS_HOST" >> .env
echo "REDIS_PORT=$REDIS_PORT" >> .env
echo "RESOURCES_PATH=$RESOURCES_PATH" >> .env
echo "DB_DATA_PATH=$DB_DATA_PATH" >> .env
echo "RESOURCES_DATA_PATH=$RESOURCES_DATA_PATH" >> .env
