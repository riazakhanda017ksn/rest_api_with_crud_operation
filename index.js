const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const student = new mongoose.Schema({
  name: String,
  workOut: Boolean,
  height: Number,
});

const Student = new mongoose.model("Student", student); ///model is like = collections

const adder = async () => {
  //   const get = await Student.find({ name: { $eq: "riaz" } });   eq= equal
  //   const get = await Student.find({ name: { $gt: "riaz" } }); gt = greater
  //   const get = await Student.find({ name: { $gte: "riaz" } }); gte = greater then or equal
  //   const get = await Student.find({ name: { $in: ["riaz", "Riaz"] } }); in = [in array has thats all  value]
  //   const get = await Student.find({ name: { $nin: ["riaz", "Riaz"] } });[]
  const get = await Student.find({ name: { $in: ["riaz", "Riaz"] } });

  //   const get = await Student.find();
  console.log(get);
  //   await Student.create({
  //     name: "Riaz",
  //     workOut: false,
  //     height: 5.2,
  //   });
};

adder();
