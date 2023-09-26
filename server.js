const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Set up a route to handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Serve uploaded images from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(filename, { root: "./uploads" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
