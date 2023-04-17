# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /ExpressJS-app
COPY . .
RUN npm install --production
CMD ["node", "app.js"]
EXPOSE 3000