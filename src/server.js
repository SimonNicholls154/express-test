const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

console.log(process.env);

const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/complaints', complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
