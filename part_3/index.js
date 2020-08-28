const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "123",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "456",
    id: 2,
  },
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/info", (req, res) => {
  const date = new Date();
  res.send(
    `
    <p>Phone book has info for ${persons.length} people</p>
    <p>${date}</p>
    `
  );
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((person) => person.id === Number(req.params.id));
  if (person) {
    res.send(person);
  } else {
    res.status(400).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
