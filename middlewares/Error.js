const ErrorMiddle  = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    console.log(err);
    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}

export default ErrorMiddle