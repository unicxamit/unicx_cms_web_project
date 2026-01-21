import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    short_description: {
      type: String,
      // required:[true,"blog short_description is required"]
    },
    content: {
      type: String,
      // required:[true,"blog content is required"]
    },
    tage: {
      type: String,
      // required:[true,"blog tage is required"]
    },
    images: [
      {
        type: String,
        default: "",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    categoryId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    createdAt: Date,
updatedAt: Date

  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blogs", blogsSchema);

export default Blog;
