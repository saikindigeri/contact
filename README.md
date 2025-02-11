# Contact Management API

A simple RESTful API for managing contacts built with Node.js, Express, and MongoDB.

## Repository

GitHub Repo: [https://github.com/saikindigeri/contact.git](https://github.com/saikindigeri/contact.git)

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/saikindigeri/contact.git
   cd contact
2. **Install dependencies:**
  npm install

3. **Start the server:**
  node server.js
  The server will start on http://localhost:5000.


---

### Explanation


- **API Endpoints:**  
  - **GET /contacts:** Fetch all contacts.
  - **GET /contacts/:id:** Fetch a single contact by ID.
  - **GET /contacts/search:** Search contacts with a query parameter.
  - **POST /contacts:** Create a new contact (with an example JSON payload).
  - **PUT /contacts/:id:** Update a contact (with an example JSON payload).
  - **DELETE /contacts/:id:** Delete a contact.

