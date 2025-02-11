const Contact = require("../models/contactModel");

// 📌 Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

// 📌 Get Single Contact
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: "Error fetching contact" });
  }
};

// 📌 Search Contacts by Name or Email
exports.searchContacts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Search query is required" });

    const contacts = await Contact.find({
      $or: [
        { name: new RegExp(query, "i") },
        { email: new RegExp(query, "i") }
      ]
    });

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Error searching contacts" });
  }
};

// 📌 Create New Contact
exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact created successfully", newContact });
  } catch (err) {
    res.status(500).json({ error: "Error creating contact" });
  }
};

// 📌 Update Contact
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: "Error updating contact" });
  }
};

// 📌 Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting contact" });
  }
};
