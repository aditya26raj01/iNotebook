const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator")

// ROUTE 1

// Get all the note Login required

router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id })
    res.json(note)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured!")
  }
})


// ROUTE 2

// Add New note Login required

router.post("/addnote", fetchuser, [
  // note Validation
  body("title", "Enter a Valid title").isLength({ min: 3 }),
  body("description", "Enter a Valid Description").isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag, date } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured!")
  }
})


// ROUTE 3

// update note Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body

    // Create a new note obbject
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not Found!")
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured!")
  }
})


// ROUTE 4

// Delete note Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {

    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not Found!")
    }
    // Allow deletion if user ownes the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "success": "Note has been deleted", note: note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured!")
  }
})

module.exports = router