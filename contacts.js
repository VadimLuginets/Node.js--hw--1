const path = require("path");
const fs = require("fs");
const contactsPath = path.join(__dirname, "db", "contacts.json");
function listContacts() {
  const contacts = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(JSON.parse(contacts));
}
function getContactById(contactId) {
  const contacts = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  const data = JSON.parse(contacts);
  const result = data.filter((cont) => {
    const { id } = cont;
    if (Number(id) === Number(contactId)) {
      return cont;
    }
  });
  console.log(result);
}
function removeContact(contactId) {
  const data = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      return console.log(err);
    }
  });
  const dataToWrite = JSON.parse(data).filter((cont) => {
    const { id } = cont;
    if (Number(id) !== Number(contactId)) {
      return cont;
    }
  });
  fs.writeFileSync(contactsPath, JSON.stringify(dataToWrite), (err) => {
    err ? console.log(err) : null;
  });
  console.log(console.log(dataToWrite));
}
function addContact(name, email, phone) {
  const data = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      return console.log(err);
    }
  });
  const parsedData = JSON.parse(data);
  let genId = parsedData.length;
  genId++;
  const contactToAdd = {
    id: genId.toString(),
    name: name,
    email: email,
    phone: phone,
  };
  parsedData.push(contactToAdd);
  console.log(parsedData);
  fs.writeFileSync(contactsPath, JSON.stringify(parsedData), (err) => {
    err ? console.log(err) : null;
  });
  console.log(parsedData);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
