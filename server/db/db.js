const mongoose = require("mongoose");

module.exports = async function (url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Connected to DB");
  } catch (error) {
    console.error("Something went wrong", error);
  }
};
