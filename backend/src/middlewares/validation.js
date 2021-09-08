const validation = (schema) => async(request, response, next) => {
    const body = request.body

    try {
        await schema.validate(body)
        next()
    } catch (error) {
        return response.status(400).json(error.message)
    }
}

module.exports = validation