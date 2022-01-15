import { MongoClient } from "mongodb"

/**
 *
 * @param {String} mongodb_url connection string of mongodb
 * @param {String} c1 collection 1
 * @param {String} c2 collection 2
 * @returns {Object} keys as device.id and values as array of latest 50 locations
 */
export const getDeviceLocations = async (mongodb_url, c1, c2) => {
	// connection to db
	const client = await MongoClient.connect(mongodb_url, {
		useNewUrlParser: true,
	})

	// getting db
	const db = client.db("__CONCOX__")

	// getting latest 30 devices
	const devices = await db
		.collection(c1)
		.find()
		.sort({ createdAt: -1 })
		.limit(30)
		.project({ _id: 0, id: 1 })
		.toArray()

	var statuses = {} // for storing latest 50 locations for device.id as keys

	// now iterate all devices and get latest 50 locations available
	await Promise.all(
		devices.map(async (device) => {
			statuses[device.id] = await getStatus(db, c2, device.id)
		})
	)
	return statuses
}

/**
 *
 * @param {MongoClient} db mongodb connection
 * @param {String} collection name of collection
 * @param {String} device_id device id of which status is to be return
 * @returns {Array} array of latest 50 locations
 */
async function getStatus(db, collection, device_id) {
	var raw_status = await db
		.collection(collection)
		.find({ device: { $eq: device_id }, gps: { $ne: null } })
		.sort({ createdAt: 1 })
		.limit(50)
		.project({ _id: 0, gps: 1 })
		.toArray()
	return raw_status.map((status) => status.gps) // converting to 2D array as asked
}
