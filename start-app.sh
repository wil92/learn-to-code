#!/bin/bash

nginx -g 'pid /tmp/nginx.pid;daemon off;' &
node /app/dist/apps/api/main.js
