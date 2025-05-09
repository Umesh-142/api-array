import express, { json } from "express";

import axios from "axios";

const app = express();

app.use(json());

const PORT = process.env.PORT || 1142;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Server is fine at ${PORT}</h1>`);
});

app.post("/getMaxMinAvg", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    console.log("Incorrect data");
    res.status(400).json("Data is not a array");
  }

  if (data.length == 0) res.status(400).json("Empty array");

  data.forEach((ele) => {
    if (isNaN(ele)) {
      res.status(400).json("Data is Incorrect");
    }
  });

  const max = Math.max(...data); // Finds the maximum value
  const min = Math.min(...data); // Finds the minimum value
  const avg = data.reduce((sum, num) => sum + num, 0) / data.length; // Calculates the average

  res.status(200).json({ max, min, avg });
});

app.get("/print/:myname", (req, res) => {
  const name = req.params.myname;
  res.status(200).json({ Name: `Your beutiful Name is ${name}` });
});
