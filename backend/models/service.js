import mongoose from "mongoose";

const serviceSchema= new mongoose.Schema({
name:{
        type:String,
        required:[true,"service name is required"],
    },
   
  status:{
  type:String,
  enum:["active","inactive"],
  default:"active",
},
 order_index: {
      type: Number,
      unique:true,
    //   default: 0,
      index: true
    },
subcategory:[{
        type:mongoose.Schema.ObjectId,
        ref:"subcategory",
    }],
    category:[{
        type:mongoose.Schema.ObjectId,
        ref:"category",
    }],
    createdAt: Date,
updatedAt: Date

},{
    timestamps:true,
})

const Service= mongoose.model("service",serviceSchema);

export default Service;