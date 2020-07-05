FROM node:current-slim
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
CMD ["npm", "start"]
