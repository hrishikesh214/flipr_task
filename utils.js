import chalk from "chalk"

/**
 *
 * @param {Function} fn callback or server function to use for the endpoint
 * @description this function is used as wrapper function which will catch any error thrown by the callback function and will return the error message to the client
 */
export const catchError = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (e) {
			console.error(`${chalk.red("[error handler]")} ${e}`)
			res.status(400).send({
				ok: false,
				error: {
					code: 400,
					msg: e,
				},
			})
		}
	}
}
