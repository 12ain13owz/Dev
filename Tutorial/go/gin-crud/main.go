package main

import (
	"github.com/12ain13owz/go-gin/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	port := ":5000"

	router.Use(cors.Default())
	routes.UserRoute(router)
	router.Run(port)
}
