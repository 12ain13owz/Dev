package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client = ConnectDatabase()

func ConnectDatabase() *mongo.Client {
	var localhost string = "mongodb://localhost:27017"
	var client *mongo.Client
	var err error
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(localhost)
	client, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Println("Cannot connect database!")
		log.Fatal(err)
	}

	// ping database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Println("Cannot ping database!")
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")
	return client
}

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection
	collection = client.Database("golangAPI").Collection(collectionName)

	return collection
}
