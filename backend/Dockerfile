FROM node:current-slim
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
