package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/12ain13owz/go-gin/config"
	"github.com/12ain13owz/go-gin/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = config.GetCollection(config.DB, "users")
var validate = validator.New()

func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		var err error

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		err = c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		err = validate.Struct(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		newUser := models.User{
			ID:       primitive.NewObjectID(),
			Username: user.Username,
			Password: user.Password,
			FullName: user.FullName,
		}

		_, err = userCollection.InsertOne(ctx, newUser)

		if err != nil {
			c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		c.JSON(http.StatusCreated, models.Response{Message: "Create success."})
	}
}

func GetUserByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		var err error
		id := c.Param("id")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(id)
		err = userCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}

func EditUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		var err error
		id := c.Param("id")
		objId, _ := primitive.ObjectIDFromHex(id)

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		err = c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		err = validate.Struct(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		update := bson.M{"$set": bson.M{"username": user.Username, "password": user.Password, "fullname": user.FullName}}
		_, err = userCollection.UpdateOne(ctx, bson.M{"_id": objId}, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		c.JSON(http.StatusCreated, models.Response{Message: "Update success."})
	}
}

func DeleteUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		id := c.Param("id")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(id)
		result, err := userCollection.DeleteOne(ctx, bson.M{"_id": objId})
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			return
		}

		if result.DeletedCount < 1 {
			c.JSON(http.StatusNotFound, models.Response{Message: "Error!", Data: err.Error()})
		}

		c.JSON(http.StatusOK, models.Response{Message: "Delete success."})
	}
}

func GetAllUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []models.User
		var err error

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		result, err := userCollection.Find(ctx, bson.M{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			return
		}
		defer result.Close(ctx)

		for result.Next(ctx) {
			var user models.User

			err = result.Decode(&user)
			if err != nil {
				c.JSON(http.StatusInternalServerError, models.Response{Message: "Error!", Data: err.Error()})
			}

			users = append(users, user)
		}

		c.JSON(http.StatusOK, users)
	}
}
