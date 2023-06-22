const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.json());
app.use(cors());

app.get("/api/v1/name", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(404).json({
        message: "Id not found",
      });

    const data = await readFileAsync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    const name = jsonData.find((name) => name.id === id);
    if (!name)
      return res.status(404).json({
        message: "Id not found",
      });

    return res.json({
      ...name,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
});

app.post("/api/v1/name", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(404).json({
        message: "name is required",
      });

    const data = await readFileAsync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    jsonData.push({
      name,
      id: `${jsonData.length + 1}`,
    });

    await writeFileAsync("data.json", JSON.stringify(jsonData), "utf8");

    return res.json({
      name,
      id: `${jsonData.length}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
});

module.exports = app;
