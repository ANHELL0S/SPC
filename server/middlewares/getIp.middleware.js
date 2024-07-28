// Code by OpenAI
function getIpAddress(req, res, next) {
	const forwarded = req.headers['x-forwarded-for']
	req.userIp = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
	next()
}

export { getIpAddress }
