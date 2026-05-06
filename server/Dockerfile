FROM golang:1.22-alpine

WORKDIR /app

# Copy go mod files
COPY go.mod ./
COPY go.sum ./

# Copy configuration
COPY dbconfig.json .

# Copy source code
COPY server ./server
COPY db ./db

# Copy the built frontend build folder
COPY frontend/build ./frontend/build

# Build the server
RUN cd server && go build -o main

EXPOSE 8080

CMD cd server && ./main
