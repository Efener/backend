const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const setupSwagger = require('./swagger');

setupSwagger(app);



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.error("Error", err));


const indexRoutes = require("./routes/indexRoutes");

app.use(express.json());

app.use("/api/v1/", indexRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
