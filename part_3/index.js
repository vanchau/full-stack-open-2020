const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get("/api/info", async (req, res) => {
  const date = new Date();
  const persons = await Person.find({});
  res.send(
    `
    <p>Phone book has info for ${persons.length} people</p>
    <p>${date}</p>
    `
  );
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

app.post("/api/persons", async (req, res, next) => {
  try {
    const person = new Person({
      name: req.body.name,
      number: req.body.number,
    });
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (e) {
    next(e);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const body = req.body;

    const person = {
      name: body.name,
      number: body.number,
    };

    const updated = await Person.findByIdAndUpdate(req.params.id, person, {
      new: true,
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
