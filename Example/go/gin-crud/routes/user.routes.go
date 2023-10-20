package routes

import (
	"github.com/12ain13owz/go-gin/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {

	router.GET("/user", controllers.GetAllUser())
	router.POST("/user", controllers.CreateUser())
	router.GET("/user/:id", controllers.GetUserByID())
	router.PUT("/user/:id", controllers.EditUser())
	router.DELETE("/user/:id", controllers.DeleteUser())

}
