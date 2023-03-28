const express = require("express");
var router = express.Router();
const ordersModel = require("../models/orders");
const productsModel = require("../models/products");

//create
router.post("/", async (req, res) => {
  try {
    let body = req.body;
    console.log(body.detail);
    let new_order = new ordersModel({
      total: body.total ?? '',
      detail: body.detail,
    });

    for (let item of body.detail) {
      let product = await productsModel.find({ product_id: item.product_id });
        // console.log(product);
      if (product[0].amount - item.amount < 0) {
        return res.status(500).send({
          message: "สินค้าไม่พอ",
          success: false,
        });
      } else {
        await productsModel.updateOne(
          { product_id: item.product_id },
          {
            $set: {
              amount: product[0].amount - item.amount,
            },
          }
        );
      }
    }

    let order = await new_order.save();
    return res.status(201).send({
      data: order,
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

//get order all
router.get("/", async (req, res) => {
  try {
    let orders = await ordersModel.find();
    return res.status(201).send({
      data: orders,
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

//get by id
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let orders = await ordersModel.findById(id);
    return res.status(201).send({
      data: orders,
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

module.exports = router;
