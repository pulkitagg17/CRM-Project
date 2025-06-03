const mongoose=require("mongoose");

const dbconnect=async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URL,({
     }));
     console.log("database connected successfulyy");
    }
    catch(err){
       console.log(err);
       console.log("db didnt connect");
    }
}
module.exports=dbconnect;