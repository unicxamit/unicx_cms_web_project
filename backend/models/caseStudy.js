import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "casestudy title is required"],
    },
    client_name: {
      type: String,
      required: [true, "casestudy client_name is required"],
    },
    Description: {
      type: String,
      required: [true, "casestudy description is required"],
    },
    Additional_Details: {
      type: String,
      required: [true, "casestudy additional_details is required"],
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

const CaseStudy = mongoose.model("casestudy", caseStudySchema);

export default CaseStudy;
