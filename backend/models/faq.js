import mongoose from "mongoose";

const faqSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Faq question is required"],
    },
    answer:{
        type:String,
        required:[true,"Faq ans is required"]
    },
    status:{
  type:String,
  enum:["active","inactive"],
  default:"active",
},

    category:[{
        type:mongoose.Schema.ObjectId,
        ref:"category",
    }],
//     createdAt: Date,
// updatedAt: Date

},{
    timestamps:true,
})

const Faq= mongoose.model("faq",faqSchema);

export default Faq;