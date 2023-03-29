const express = require("express");
var router = express.Router();
const productsModel = require("../models/products");
const auth = require('../middleware/auth');

//create
router.post("/", async (req, res) => {
  try {
    let { product_id, product_name, description, price, amount, image } =
      req.body;
    console.log(req.body);
    let new_product = new productsModel({
      product_id,
      product_name,
      description,
      price,
      amount,
      image,
    });

    let product = await new_product.save();
    return res.status(201).send({
      data: product,
      message: "create success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
    });
  }
});

//get user all
router.get("/", async (req, res) => {
  try {
    let products = await productsModel.find();
    return res.status(201).send({
      data: products,
      message: "get success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
    });
  }
});

//get data by id
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let products = await productsModel.findById(id);
    return res.status(201).send({
      data: products,
      message: "get success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await productsModel.deleteOne({ _id: id });
    let products = await productsModel.find();
    return res.send({
      data: products,
      message: "delete success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
    });
  }
});

//update data
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { product_id, product_name, description, price, amount, image } =
      req.body;
    await productsModel.updateOne(
      { _id: id },
      {
        $set: {
          product_id,
          product_name,
          description,
          price,
          amount,
          image,
        },
      }
    );

    let product = await productsModel.findById(id);

    return res.status(201).send({
      data: product,
      message: "update success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
    });
  }
});

router.put("/stock/:id", async (req, res) => {
  try {
  let id = req.params.id;
  let amount = req.body.amount;
  let type = req.body.type;

  let amount_old = await productsModel.findById(id);
  console.log(amount);
  console.log(type);
  console.log(id);
  console.log(amount_old.amount + amount);

  if (type == "add") {
    await productsModel.updateOne(
      { _id: id },
      {
        $set: {
          amount: amount_old.amount + amount,
        },
      }
    );
  } else {
    var new_amount = amount_old.amount - amount;
    if (new_amount < 0) {
      return res.status(500).send({
        message: "สินค้าไม่สามารถติดลบได้",
        success: false,
      });
    }else{
      await productsModel.updateOne(
        { _id: id },
        {
          $set: {
            amount: amount_old.amount - amount,
          },
        }
      );
    }
  }
    let product = await productsModel.findById(id);

    return res.status(201).send({
      data: product,
      message: "update success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
      success: false,
  });
  }
});

module.exports = router;
