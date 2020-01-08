#!/bin/sh

# Start API server
cd /usr/src/api
while [ $? -ne 0 ]; do !!; done
npm install
npm run start-dev