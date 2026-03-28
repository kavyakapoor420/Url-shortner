
const asyncHanlder=(handler)=async (req,res,next)=>{

    try{
       await handler(req,res,next) ;

    }catch(err){
        next(err) ;
    }
}

export const protect=asyncHanlder(async(req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]  || req.body.token ;

    if(!token){
        const err=new Error("autentication failed")
        err.statusCode=401;
        throw err ;
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET) ;

    const user=await User.findById(decoded.userId).select("-password")

    if(!user){
        const err=new error("user not found")
        err.statusCode=404 ;
        throw err ;
    }

    req.user=user ;
    next() ;
})

export const notFound=(req,res,next)=>{
    const err=new Error(`route not found:${req.originalUrl}`)
    err.statusCode=404;
    next(err);
}

export const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500 ;

    res.status(statusCode).json({
        success:false ,
        message:err.message || 'something went wrong',
        stack:process.env.NODE_ENV==='production' ? undefined : err.stack 
    })
}


export default asyncHanlder