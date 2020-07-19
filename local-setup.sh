#!/bin/bash

error() {
  echo $1
  exit 1
}

touch backend/.env
echo "# Local" >> backend/.env
echo "MONGO_URI=mongodb://localhost/mern-exercise-tracker" >> backend/.env
echo "# Atlas" >> backend/.env
echo "# MONGO_URI=mongodb+srv://<user>:<password>@<uri>/<dbname>?<options>" >> backend/.env

touch frontend/.env
echo "REACT_APP_API_URL=http://localhost:5000" >> frontend/.env

cd backend
npm i || error "Error installing backend dependencies"
cd ../frontend
npm i || error "Error installing frontend dependencies"

echo "Setup completed"
