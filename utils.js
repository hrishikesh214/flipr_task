import chalk from "chalk"

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
