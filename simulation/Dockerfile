FROM node:19-alpine

WORKDIR /app

# Copy package files first (for better caching)
COPY simulation/package.json simulation/package-lock.json* ./simulation/

# Copy the rest of the simulation files
COPY simulation ./simulation
COPY dbconfig.json .

# Install dependencies
RUN cd simulation && npm install

CMD cd simulation && node main.js
