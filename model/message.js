const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

exports.Message = models.Message || model("Message", messageSchema);
