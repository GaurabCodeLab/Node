const mongoose = require("mongoose");

const { Schema, models, model } = mongoose;

const messageSchema = new Schema({
  userName: {
    type: String,
  },
  message: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

exports.Message = models.Message || model("Message", messageSchema);
