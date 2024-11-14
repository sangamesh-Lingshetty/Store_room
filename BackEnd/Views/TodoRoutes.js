const express = require("express");

const todoschema = require("../Module/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newnode = new todoschema({
      title: req.body.title,
    });
    await newnode.save();
    res.status(200).json(newnode);
  } catch (error) {
    res.status(500).json({ message: "error in creating todo", error });
  }
});

router.get("/", async (req, res) => {
  //get the data from the database.
  try {
    const todos = await todoschema.find();
    res.status(200).json({ message: "data fetch succssfully", todos });
  } catch (error) {
    res.status(500).json({ message: "Error from todorouter.js file", error });
  }
});

router.put("/:id", async (req, res) => {
  //update the data from the database.
  try {
    const id = req.params.id;
    const todo = await todoschema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "data update successfully", todo });
    
  } catch (error) {
    res.status(500).json({ message: "error is from update side", error });
  }
});

router.delete("/:id", async (req, res) => {
  //detele the data from the database.
  try {
    const id = req.params.id;
    const todo = await todoschema.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully", todo });

  } catch (error) {
    res.status(500).json({ message: "error is from delete side", error });
  }
});

module.exports = router;
