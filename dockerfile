# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /ExpressJS-app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "expressJS-app/app.js"]