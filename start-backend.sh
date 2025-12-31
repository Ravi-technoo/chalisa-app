#!/bin/bash

echo "Starting Hanuman Chalisa Backend Server..."
echo ""

cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/backend"

# Kill any existing processes on port 5000
lsof -ti:5000 | xargs kill -9 2>/dev/null
sleep 1

# Start the server
node src/server.js
