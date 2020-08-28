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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
