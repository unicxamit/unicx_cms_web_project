// import multer from "multer";
// const storage= multer.memoryStorage();

// const upload= multer({storage:storage})
// // console.log(upload,"image upload");
// export default upload;


import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
 export default upload;