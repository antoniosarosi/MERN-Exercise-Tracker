# MERN Exercise Tracker

Simple MERN Web App, original code & author: <br />
https://www.youtube.com/watch?v=7CqJlxBYj-M&t=2189s

## Setup

First, clone the repo and cd into the project
```bash
git clone https://github.com/antoniosarosi/MERN-Exercise-Tracker.git
cd MERN-Exercise-Tracker
```

### Docker setup
Use the setup script:
```bash
bash docker-setup.sh
```
### Run on Docker containers
```bash
docker-compose up
```
### Local setup
Use the auto setup script:
```bash
bash local-setup.sh
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
### Run locally
In the project directory:
```bash
cd backend
npm run dev
```
On another terminal:
```bash
cd frontend
npm start
```

Backend will be on port 5000 and frontend on port 3000 (if not already in use)
