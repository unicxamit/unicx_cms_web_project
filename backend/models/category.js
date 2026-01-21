import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
   
    order_index: {
      type: Number,
      unique:true,
      // default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },


  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);
export default Category;
