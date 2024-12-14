import mongoose from "mongoose";

export const connectDB = async () => {
  const url = process.env.PORT || 4000;

  await mongoose
    .connect(url)
    .then(() => {
      console.log("Base de datos conetada :)");
    })
    .catch((err) => {
      console.log(err);
    });
};
