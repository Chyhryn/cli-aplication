const fs = require("node:fs").promises;
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((resp) => console.table(JSON.parse(resp)))
    .catch((err) => console.error(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((resp) => {
      const contacts = JSON.parse(resp);
      const contact = contacts.find(
        (contact) => contact.id === contactId.toString()
      );
      console.log(contact);
      return contact;
    })
    .catch((err) => console.error(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((resp) => {
      const contacts = JSON.parse(resp);
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId.toString()
      );
      return JSON.stringify(updatedContacts);
    })
    .then((resp) => {
      fs.writeFile(contactsPath, resp);
      console.table(JSON.parse(resp));
    })
    .catch((err) => console.error(err));
}

function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath, "utf-8")
    .then((resp) => {
      const contacts = JSON.parse(resp);
      const updatedContacts = [...contacts, newContact];
      return JSON.stringify(updatedContacts);
    })
    .then((resp) => {
      fs.writeFile(contactsPath, resp);
      console.table(JSON.parse(resp));
    })
    .catch((err) => console.error(err));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
