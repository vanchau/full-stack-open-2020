const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

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
  {
    name: "Tester Test",
    number: "789",
    id: 3,
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

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((person) => person.id !== Number(req.params.id));
  res.send(persons);
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.status(400).json({
      error: "name or number is missing",
    });
  } else if (persons.some((person) => person.name === req.body.name)) {
    res.status(400).json({
      error: "name must be unique",
    });
  } else {
    const newPerson = req.body;
    newPerson.id = parseInt(
      Math.random(Number.MAX_SAFE_INTEGER) * 10000000000000000
    );
    persons = persons.concat(newPerson);
    res.send(persons);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
