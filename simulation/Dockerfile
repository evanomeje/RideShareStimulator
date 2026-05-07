FROM node:19-alpine

WORKDIR /app

# Copy package files
COPY simulation/package*.json ./
RUN npm install

# Copy all simulation files
COPY simulation/ ./simulation/
COPY _config/ ./_config/
COPY dbconfig.json ./

# Set working directory
WORKDIR /app/simulation

# Run the simulation
CMD node main.js
