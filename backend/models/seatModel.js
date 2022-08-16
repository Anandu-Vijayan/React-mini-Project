const mongoose =require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId


const seatSchema =mongoose.Schema(
    {
        seat_number:{
            type:Number,
            
        },

    name:{
        type:String,
        
    },
    email:{
        type:String,
        
        

    },
    user_id:{
        type:ObjectId,
        ref:"User" ,
           
    },
   
    status:{
        type:Boolean,
        default:true,
        
    }
     
},{
    timestamps:true,
})
 
 
 
const Seats =mongoose.model('Seating',seatSchema)
 



module.exports = Seats;