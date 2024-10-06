const Hotel = require("../model/hotelsSchema");
const fs = require("fs");

const create = async (req, res) => {
  //   console.log("RES Fields", req.fields);
  //   console.log("RES files", req.files);
  try {
    let fields = req.fields;
    let files = req.files;
    let hotel = new Hotel(fields);
    //handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    const result = await hotel.save();
    res.json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Error saving",
    });
  }
};

module.exports = { create };
