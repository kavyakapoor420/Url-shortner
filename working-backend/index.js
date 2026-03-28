
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

const buildAuthResponse=(user)=>({
    _id:user._id ,
    name:user.name,
    email:user.email,
    createdAt:user.createdAt 
})

export const signup=asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body ;

    if(!name || !email || !password){
        const err=new Error("name email and password are required");
        err.statusCode=400 ;
        throw err ;
    }

    const normalizedEmail=email.trim().toLowerCase() ;
    const exisitingUser=await User.findOne({email:normalizedEmail}) 
    if(exisitingUser){
        const err=new Error('an account with this email already exists')
        err.statusCode=400 ;
        throw err ;
    }
   
    const user=await User.create({
        name:name.trim(),email:normalizedEmail,password 
    })

    const token=generateToken(user._id) ;

    res.cookie("token",token,cookieOptions)

    res.status(201).json({
        success:true,
        message:"account created successfully",
        user:buildAuthResponse(user) 
    })

})

export const login=asyncHandler(async(req,res)=>{

    const {email,password}=req.body ;

    if(!email || !password){
        const err=new Error('email and password are required')
        err.statusCode=400 ;
        throw err ;
    }

    const normalizedEmail=email.trim().toLowerCase() ;
    const user=await User.findOne({email:normalizedEmail}) ;

    if(!user || !(await user.comparePassword(password))){
        const err=new Error("invalid email or password")
        err.statusCode=401 ;
        throw err ;
    }

    const token=generateToken(user._id) ;
    
    res.cookie("token",token,cookieOptions) ;

    res.json({
        success:true,message:"logged in successfully",
        message:"logged in successfully",
        user:buildAuthResponse(user) 
    })

})




export default asyncHanlder