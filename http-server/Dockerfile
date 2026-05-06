FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
COPY *.go ./
COPY static ./static
COPY postgres ./postgres

RUN go build -o /main

EXPOSE 443

CMD [ "/main" ]
