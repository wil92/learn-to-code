FROM node:12.22.1-alpine

MAINTAINER Guillermo "guille@binary-coffee.dev"

# update container dependencies
RUN apk update

WORKDIR /app

# project dependencies
COPY package*.json ./
RUN npm install

# install nginx in the container and config
RUN apk add nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy the project
COPY . ./

# build project
RUN npm run build

# copy script to the root of the container
COPY start-app.sh /start-app.sh

# init container
CMD ["/bin/sh", "/start-app.sh"]
