import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    related:[
        {
           similar: {type:String,}
        }
    ]
})

const comment = mongoose.model('comment', commentSchema)

export default comment