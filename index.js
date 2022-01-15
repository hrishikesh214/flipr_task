import chalk from "chalk"
import express from "express"
import dotenv from "dotenv"
dotenv.config() // Load .env file

// importing routes
import solution from "./routes/index.js"

const app = express()

app.use(express.json()) // for parsing application/json

// adding custom header to response for below all routes as mentioned in task statement
app.use((req, res, next) => {
	res.header("Name", "Hrishikesh Vaze")
	res.header("Contact", "hrishikesh.vaze01@gmail.com")
	next()
})

// lets add all routes
app.use("/api", solution)

// server start
app.listen(process.env.PORT, () => {
	console.log(
		`${chalk.greenBright("[server]")} listening on port ${chalk.green(
			process.env.PORT
		)}`
	)
})
