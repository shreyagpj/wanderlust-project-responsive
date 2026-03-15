const mongoose = require("mongoose");
const { coordinates } = require("../utils/coordinates.js");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dbUrl = process.env.ATLAS_URL;

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

async function clearData() {
  await Listing.deleteMany({});
}

async function insertData() {
  initData.data = await Promise.all(
    initData.data.map(async (obj) => {
      return {
        ...obj,
        owner: "69b411dcf5294f8bc87e3b91",
        geometry: await coordinates(obj.location),
      };
    }),
  );

  try {
    await Listing.insertMany(initData.data);
    console.log("data was saved");
  } catch (err) {
    console.log(err);
  }
}

async function seedData() {
  await clearData();
  await insertData();
}

seedData();
