# backend/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start:dev"]
