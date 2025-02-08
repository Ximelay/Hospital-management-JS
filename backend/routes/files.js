const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/download/consent", (req, res) => {
    const filePath = path.join(__dirname, "..", "files", "consent.docx");
    res.download(filePath, "consent.docx");
});

router.get("/download/agreement", (req, res) => {
    const filePath = path.join(__dirname, "..", "files", "contract.docx");
    res.download(filePath, "contract.docx");
});

module.exports = router;
