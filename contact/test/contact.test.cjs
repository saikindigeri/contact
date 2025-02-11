const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Make sure your server.js exports the Express app
const Contact = require("../models/Contact"); // Ensure the model file name/casing is correct

const { expect } = chai;
chai.use(chaiHttp);

describe("Contact Management API", function () {
  // Increase timeout if your database operations are slow.
  this.timeout(10000);

  let testContactId = null; // We'll store a contact's ID for later tests.

  // Before running tests, clear the contacts collection.
  before(async () => {
    await Contact.deleteMany({});
  });

  // 1. Test: Create a new contact
  it("should create a new contact", (done) => {
    const newContact = {
      name: "Sai Kumar",
      email: "sai@example.com",
      phone: "9876543210",
      address: "Hyderabad",
    };

    chai
      .request(app)
      .post("/contacts")
      .send(newContact)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.newContact).to.have.property("name", newContact.name);
        expect(res.body.newContact).to.have.property("email", newContact.email);
        testContactId = res.body.newContact._id; // Store ID for later tests.
        done();
      });
  });

  // 2. Test: Fetch all contacts
  it("should fetch all contacts", (done) => {
    chai
      .request(app)
      .get("/contacts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  // 3. Test: Fetch a single contact by ID
  it("should fetch a contact by ID", (done) => {
    chai
      .request(app)
      .get(`/contacts/${testContactId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id", testContactId);
        done();
      });
  });

  // 4. Test: Update a contact
  it("should update a contact", (done) => {
    const updatedData = {
      name: "Sai Updated",
      email: "sai_updated@example.com",
      phone: "1234567890",
      address: "New Hyderabad",
    };

    chai
      .request(app)
      .put(`/contacts/${testContactId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("name", updatedData.name);
        expect(res.body).to.have.property("email", updatedData.email);
        done();
      });
  });

  // 5. Test: Search contacts by name or email
  it("should search contacts by name or email", (done) => {
    chai
      .request(app)
      .get("/contacts/search")
      .query({ query: "Sai" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        // Check that at least one returned contact contains "sai"
        const found = res.body.some(contact =>
          contact.name.toLowerCase().includes("sai") ||
          contact.email.toLowerCase().includes("sai")
        );
        expect(found).to.be.true;
        done();
      });
  });

  // 6. Test: Delete a contact
  it("should delete a contact", (done) => {
    chai
      .request(app)
      .delete(`/contacts/${testContactId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Contact deleted successfully");
        done();
      });
  });

  // 7. Test: Fetch a non-existing contact to ensure proper error handling
  it("should return 404 for a non-existing contact", (done) => {
    chai
      .request(app)
      .get(`/contacts/${testContactId}`) // testContactId was deleted in previous test
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Contact not found");
        done();
      });
  });
});
