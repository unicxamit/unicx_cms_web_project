import Faq from "../models/faq.js";

// Create a new FAQ
export const createFaq = async (req, res, next) => {
  try {
    const { question, answer, status, category } = req.body;

    const faq = await Faq.create({
      question,
      answer,
      status,
      category,
    });

    res.status(201).json({
      status: true,
      message: "FAQ created successfully",
      faq,
    });
  } catch (error) {
    console.log("Create FAQ error:", error);
    next(error);
  }
};

// Get all FAQs
export const getAllFaqs = async (req, res, next) => {
  try {
    // const faqs = await Faq.find()
    //   .sort({ createdAt: -1 })
    //   .populate({ path: "category", select: "name" });

      const [faqs,totalFaqs]= await Promise.all([
        Faq.find().sort({createdAt:-1}).populate({path:"category",select:"name"}),Faq.countDocuments()
      ])
    res.status(200).json({
      status: true,
      message: "All FAQs retrieved successfully",
      faqs,
      totalFaqs,
    });
  } catch (error) {
    console.log("Get all FAQs error:", error);
    next(error);
  }
};

// Get single FAQ by ID
export const getFaqById = async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id)
      .populate({ path: "category", select: "name" });

    if (!faq) {
      return res.status(404).json({ status: false, message: "FAQ not found" });
    }

    res.status(200).json({
      status: true,
      message: "FAQ retrieved successfully",
      faq,
    });
  } catch (error) {
    console.log("Get single FAQ error:", error);
    next(error);
  }
};

// Update FAQ
export const updateFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ status: false, message: "FAQ not found" });
    }

    const updatedData = {
      question: req.body.question || faq.question,
      answer: req.body.answer || faq.answer,
      status: req.body.status || faq.status,
      category: req.body.category || faq.category,
    };

    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    console.log(updatedFaq,"faq updated")

    res.status(200).json({
      status: true,
      message: "FAQ updated successfully",
      updatedFaq,
    });
  } catch (error) {
    console.log("Update FAQ error:", error);
    next(error);
  }
};

// Delete FAQ
export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ status: false, message: "FAQ not found" });
    }

    res.status(200).json({
      status: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.log("Delete FAQ error:", error);
    next(error);
  }
};

// Get FAQs by Category
export const getFaqsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const faqs = await Faq.find({ category: categoryId })
      .populate({ path: "category", select: "category_name" })
      .sort({ createdAt: -1 });

    if (!faqs || faqs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No FAQs found for this category",
      });
    }

    res.status(200).json({
      status: true,
      message: "FAQs retrieved successfully",
      faqs,
    });
  } catch (error) {
    console.log("Get FAQs by category error:", error);
    next(error);
  }
};


export const updateFaqStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const FaqStatus = await Faq.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      status: true,
      message: "Faq status updated",
     FaqStatus,
    });

  } catch (error) {
    res.status(500).json({ status:false, message:"Server Error" });
  }
};