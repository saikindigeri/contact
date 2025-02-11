const express = require("express");
const router = express.Router();
const validateContact = require("../middleware/validateContact");
const contactController = require("../controllers/contactController");

// Routes with validation middleware for creating and updating contacts
router.post("/", validateContact, contactController.createContact);
router.put("/:id", validateContact, contactController.updateContact);

// Other CRUD routes
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.get("/search", contactController.searchContacts);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
