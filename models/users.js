const mongoose = require("mongoose");
var uuid = require('node-uuid');
const users = new mongoose.Schema(
  {
    uuid: { type: String, default: function genUUID() {
        return uuid.v1()
    }},

//----model--------------------------------------------
    username: { type: String, unique: true },
    password: String,
    first_name: String,
    last_name: String,
    token: String,
    permission: { type: String, default: "user" },
//-----------------------------------------------------

  },
  { timestamps: {} }
);

module.exports = mongoose.model("users", users); //model('<ชื่อcollecttion>',<ชื่อSchema>)
