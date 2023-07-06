package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

var users = []User{
	{ID: 1, Name: "John Doe", Age: 30},
	{ID: 2, Name: "Jane Smith", Age: 25},
	{ID: 3, Name: "Bob Johnson", Age: 35},
}

func main() {
	http.HandleFunc("/users", getUsersHandler)
	log.Fatal(http.ListenAndServe(":9999", nil))
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
