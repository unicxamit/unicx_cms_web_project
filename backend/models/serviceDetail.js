import mongoose from "mongoose";

const serviceDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    metaKeyword: {
      type: String,
    },

    service: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: true,
      },
    ],
subcategory:{
  type:String,
  
},
    category:{
      type:String,
    },
    metaDescription: {
      type: String,
    },

    // 🔥 MULTIPLE SECTIONS WITH MULTIPLE IMAGES
    sections: [
      {
        sectionTitle: {
          type: String,
          required: true,
        },

        sectionDescription: {
          type: String,
          required: true,
        },
        //  images: [
        //   {
        //     type: String, 
        //   },
        // ],
      },
    ],
      images: [
          {
            type: String, 
          },
        ],
//         createdAt: Date,
// updatedAt: Date

  },
  
  { timestamps: true }
);

export default mongoose.model("ServiceDetails", serviceDetailsSchema);
