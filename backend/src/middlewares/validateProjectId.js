const { isUuid } = require("uuidv4")

const validateProjectId = (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id)) {
        return res.status(400).json({ error: "Invalid project id. "})
    }

    return next();
}

module.exports = validateProjectId