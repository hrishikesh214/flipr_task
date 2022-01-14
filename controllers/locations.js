import axios from "axios"

export const getCoordinates = async (addresses) => {
	return await Promise.all(
		addresses.map(async (addr) => {
			return {
				add: addr,
				location: await getCoordinatesFromAddress(addr),
			}
		})
	)
}

async function getCoordinatesFromAddress(address) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
	const response = await axios.get(url)
	var { location: _l } = response.data.results[0].geometry
	return [_l.lat, _l.lng]
}
