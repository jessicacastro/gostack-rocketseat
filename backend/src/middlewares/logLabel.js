const logRequest = (req, res, next) => {
    const { method, url } = req;
    
    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.time(logLabel)
    next();
    console.timeEnd(logLabel)
}

module.exports = logRequest