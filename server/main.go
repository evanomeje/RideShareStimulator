package main

import (
	db "app/db"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Ride struct {
	Id       string `json:"id"`
	CarId    string `json:"car_id"`
	Location string `json:"location"`
	Path     string `json:"path"`
}

type Customer struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Active   bool   `json:"active"`
	Location string `json:"location"`
}

func getRides(w http.ResponseWriter, req *http.Request) {
	rows, err := db.Connection.Query("SELECT * FROM rides")
	if err != nil {
		http.Error(w, "Failed to get rides: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rides []Ride

	for rows.Next() {
		var ride Ride
		rows.Scan(&ride.Id, &ride.CarId, &ride.Location, &ride.Path)
		rides = append(rides, ride)
	}

	ridesBytes, _ := json.MarshalIndent(rides, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(ridesBytes)
}

func getCustomers(w http.ResponseWriter, req *http.Request) {
	rows, err := db.Connection.Query("SELECT * FROM customers WHERE active = true")
	if err != nil {
		http.Error(w, "Failed to get customers: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var customers []Customer

	for rows.Next() {
		var customer Customer
		rows.Scan(&customer.Id, &customer.Name, &customer.Active, &customer.Location)
		customers = append(customers, customer)
	}

	customersBytes, _ := json.MarshalIndent(customers, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(customersBytes)
}

func main() {
	db.InitDB()
	defer db.Connection.Close()

	http.Handle("/", http.FileServer(http.Dir("../frontend/build")))
	http.HandleFunc("/rides", getRides)
	http.HandleFunc("/customers", getCustomers)

	serverEnv := os.Getenv("SERVER_ENV")
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	if serverEnv == "DEV" {
		log.Printf("Starting dev server on port %s", port)
		log.Fatal(http.ListenAndServe(":"+port, nil))
	} else if serverEnv == "PROD" {
		log.Printf("Starting production server on port 443")
		log.Fatal(
			http.ListenAndServeTLS(
				":443",
				"/etc/letsencrypt/live/app.evanomeje.xyz/fullchain.pem",
				"/etc/letsencrypt/live/app.evanomeje.xyz/privkey.pem",
				nil,
			),
		)
	} else {
		log.Printf("Starting default server on port %s", port)
		log.Fatal(http.ListenAndServe(":"+port, nil))
	}
}
