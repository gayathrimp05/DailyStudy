const express = require("express");

const app = express();
app.use(express.json());

let notes = [];
let id = 1;

// creating note
app.post("/notes", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newNote = {
    id: id++,
    text,
  };

  notes.push(newNote);
  res.json(newNote);
});

// this is for getting all theNotes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// this is to get single note
app.get("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

// updating note
app.put("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  if (!req.body.text) {
    return res.status(400).json({ error: "Text is required" });
  }

  note.text = req.body.text;
  res.json(note);
});

// deleting the  Note
app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex(n => n.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Day19 Notes API running on port ${PORT}`);
});