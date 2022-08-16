const mongoose =require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const applicationSchema =mongoose.Schema(
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
    state:{
        type:String,
        required:true,
 

    }, address:{
        type:String,
        required:true,
  
    },
    city:{
        type:String,
        required:true,
 

    },
    phone:{
        type:Number,
        required:true    
    },
    company_name:{
        type:String,
        required:true    
    }, zip:{
        type:String,
        required:true    
    },

    describe_company:{
        type:String,
        required:true    
    },
    describe_problem:{
        type:String,
        required:true    
    },
    describe_team:{
        type:String,
        required:true    
    }, describe_solution:{
        type:String,
        required:true    
    }, describe_value:{
        type:String,
        required:true    
    },
    user_id:{
        type:ObjectId,
        ref:"User" ,
        required:true    
    },
    
    status:{
        type:Boolean,
        default:false,
        required:true,
    },
    approval_status:{
        type:String,
        default:"pending",
        required:true,
    }
     
},{
    timestamps:true,
})
 
applicationSchema.pre('save',async function(next){
    this.status=true
    
 
})
 

 
const Application =mongoose.model('Application',applicationSchema)



module.exports = Application;