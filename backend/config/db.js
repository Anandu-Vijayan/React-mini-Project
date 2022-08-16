const mongoose =require('mongoose')

let URI =process.env.MONGO_URI 

const connectDb = async ()=>{
    try{
        console.log(URI);
        mongoose.connect(URI,  (err) => {
            if(err) throw err;
            console.log('Connected to MongoDB!!!')
         })
    }catch(error){
console.log("")
        console.log(`Error : ${error.message}`);
        process.exit();
    }
}

module.exports =connectDb;