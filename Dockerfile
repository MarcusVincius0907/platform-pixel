# Use an official Node.js LTS image as the base image
FROM node:16-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

# Define the command to run your application
CMD ["npm", "start"]
