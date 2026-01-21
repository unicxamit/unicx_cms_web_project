import mongoose from "mongoose";

const subCategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"SubCategory name is required"],
    },
   
     order_index: {
      type: Number,
      unique:true,
    //   default: 0,
      index: true
    },
    category:[{
        type:mongoose.Schema.ObjectId,
        ref:"category",
    }],
    status:{
  type:String,
  enum:["active","inactive"],
  default:"active",
},
createdAt: Date,
updatedAt: Date

},{
    timestamps:true,
})

const SubCategory= mongoose.model("subcategory",subCategorySchema);

export default SubCategory;