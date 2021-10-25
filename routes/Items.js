const express = require("express");
const Items = require("../models/Items");
require("dotenv").config();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

//Get all Items
router.get("/getItems", async (req, res) => {
  try {
    const items = await Items.find()
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Find Items using name search
router.get("/getItem", async (req, res) => {
  const name = req.body.title;
  try {
    const items = await  Items.find({ title: name });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Add Items to Db
router.post("/updateItems", async (req, res) => {
    try {
  const newItem =  await Items.create({
    itemId: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    weight: req.body.weight,
  });
  return res.status(200).json({message : "Item added"});
  } catch (err) {
    res.status(400).json(err);
  }
});

//Remove Item from Db using itemId
router.delete("/deleteItem", async (req, res) => {
  const itemId = req.body.itemId;
  try {
    const newitems = await Items.findOneAndDelete({itemId : itemId});
    return res.status(200).json(newitems)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;