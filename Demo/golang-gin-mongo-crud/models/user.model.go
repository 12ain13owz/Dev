package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"username" validate:"required"`
	Password string             `json:"password" validate:"required"`
	FullName string             `json:"fullname" validate:"required"`
}
