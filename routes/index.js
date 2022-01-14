/**
 * as there are no more points, i am considering all points here in this file only...
 */

import { Router } from "express"
import { catchError as handle } from "../utils.js"
import { MongoClient } from "mongodb"

// importing required controllers
import * as devices from "../controllers/devices.js"
import * as locations from "../controllers/locations.js"

const router = new Router()

/**
 * @description a home page telling that API is up!
 */
router.get("/", (req, res) => {
	res.send({ hello: "world" })
})

router.post(
	"/latest_locations/:c1",
	handle(async (req, res) => {
		// const { mongodb_url } = req.body
		// const { c1 } = req.params
		// const { c2 } = req.query
		// const client = await MongoClient.connect(mongodb_url, {
		// 	useNewUrlParser: true,
		// })
		// const db = client.db("__CONCOX__")
		// const devices = db.collection(c1).find({})
		// res.send(result)

		res.send({
			query: req.query,
			body: req.body,
			params: req.params,
		})
	})
)

router.post(
	"/get_coordinates",
	handle(async (req, res) => {
		var { addresses } = req.body
		var response = await locations.getCoordinates(addresses)
		res.send(response)
	})
)

export default router

// {
//     "addresses": [
//         "Plot No:1, Sadarpur, Sector-45, Noida, Uttar Pradesh 201303, India",
//         "New Link Road, Behind Infinity Mall, Andheri West, Mumbai, Maharashtra 400053, India",
//         "D-002, Sector 75 Road, Sector 75, Noida, Uttar Pradesh 201301, India",
//         "Ambrahi Village, Sector 19 Dwarka, Dwarka, Delhi, 110075, India",
//         "Plot No 53, Block B, Sector 56, Gurugram, Haryana 122001, India"
//     ]
// }
