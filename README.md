# MERN Exercise Tracker

Simple MERN Web App, original code & author: <br />
https://www.youtube.com/watch?v=7CqJlxBYj-M&t=2189s

## Local Setup

First, clone the repo and cd into the project
```bash
git clone https://github.com/antoniosarosi/MERN-Exercise-Tracker.git
cd MERN-Exercise-Tracker
```

Then use the auto setup script:
```bash
bash setup.sh
```

Or if you prefer to do it manually:

```bash
# Backend
cd backend
npm i
touch .env
echo "MONGO_URI=mongodb://localhost/mern-exercise-tracker" >> .env
# Or create a Mongodb Atlas cluster and use that URI
echo "# MONGO_URI=mongodb+srv://<user>:<password>@<uri>/<dbname>?<options>" >> .env

# Frontend
cd ../frontend
npm i
touch .env
echo "REACT_APP_API_URL=http://localhost:5000" >> .env
```
## Run Locally

Install Nodejs and Mongodb if you are not using Atlas, then make sure Mongo
is running:
```bash
systemctl start mongodb
```
Then, in the project directory:
```bash
cd backend
npm run dev
cd ../frontend
npm start
```
