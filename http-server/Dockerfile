FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod ./
COPY *.go ./
COPY static ./static

RUN go build -o /main

EXPOSE 443

CMD [ "/main" ]
