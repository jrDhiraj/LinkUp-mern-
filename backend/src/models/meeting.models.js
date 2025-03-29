import mongoose, { Schema } from "mongoose";


const meetingShema = new Schema({
    user_id:{
        type:String
    },
    meetingCode:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        
        dafault:Date.now,
        required:true
    }
})

const Meeting=mongoose.model("Meeitng", meetingShema);

export {Meeting};