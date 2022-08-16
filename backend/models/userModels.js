const mongoose =require('mongoose')

const bcrypt = require('bcryptjs')


const userSchema =mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    mobile:{
        type:Number,
        required:true    
    },
    password:{
        type:String,
        required:true    
    },
    status:{
        type:Boolean,
        default:true,
        required:true,
    }
     
},{
    timestamps:true,
})
 
userSchema.pre('save',async function(next){
    this.status=true
    if(!this.isModified('password')){
        next()
    }
  const salt =await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password,salt)


})
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User =mongoose.model('Users',userSchema)
 



module.exports = User;