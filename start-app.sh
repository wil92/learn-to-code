#!/bin/bash

nginx -g 'pid /tmp/nginx.pid;daemon off;' &
node /app/dist/apps/eval/main.js &
node /app/dist/apps/api/main.js
