FROM node:12.22.1-alpine

MAINTAINER Guillermo "guille@binary-coffee.dev"

# update container dependencies
RUN apk update

# install nginx in the container and config
RUN apk add nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

# project dependencies
COPY package*.json ./
RUN npm install

# copy the project
COPY . ./

# build project
RUN npm run build

# toDo: remove the project code from the container

# copy script to the root of the container
COPY start-app.sh /start-app.sh

# init container
CMD ["/bin/sh", "/start-app.sh"]
