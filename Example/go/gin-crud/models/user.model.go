package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"Username" validate:"required"`
	Password string             `json:"Password" validate:"required"`
	FullName string             `json:"fullname" validate:"required"`
}
