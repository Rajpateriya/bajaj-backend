const asyncHandler = (func) => {
    return async (request, response, next) =>{
    try {   
        await func(request, response, next)
        } catch (error) {
            next(error)
        }
}
}


export default asyncHandler