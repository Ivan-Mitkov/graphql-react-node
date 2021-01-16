const express = require("express");
require("dotenv").config();

const app = express();

app.get('/',(req,res)=>{
  res.json({"Hi":"There"})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
