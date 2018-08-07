#!/bin/bash
# Kill any processes using the 1337 port
kill -9 $(lsof -t -i:1337)
# Remove the old log file
rm ./test/out/server.out
rm ./test/out/device.out
# Start the server process in another screen & detach
screen -dmS stateserver bash -c 'node ./test/Server.js >> test/out/server.out'
# Wait for the server to start up
sleep 2s
# Run the device code
screen -dmS statedevice bash -c 'node ./test/Device.js >> test/out/device.out'
# Run front end tests
mocha-chrome ./test/index.html
# kill any detached screens
screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs kill
# Kill any processes using the 1337 port
kill -9 $(lsof -t -i:1337)
