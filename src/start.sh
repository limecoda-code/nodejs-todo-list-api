#!/bin/sh

# Start API server
cd /usr/src/api
while [ $? -ne 0 ]; do !!; done
npm install

DATABASE_PORT=${1:-0} 

if [ $DATABASE_PORT -gt 0 ]
then
	DATABASE_UP="false"
	CONNECTION_ATTEMPTS=0

	while [ $DATABASE_UP == "false" ]; do
		read DATABASE_UP < <(echo > /dev/tcp/database/$DATABASE_PORT && echo "true" || echo "false")
		((CONNECTION_ATTEMPTS++))

		if [ $CONNECTION_ATTEMPTS -ge 50 ]
		then
			break
		fi

		sleep 1
	done
fi

npm run start-dev