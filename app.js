const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const mongoose = require('./database/db')
const cors = require('cors'); 
const categoriesRoute = require('./routes/routes'); 
const bodyParser = require('body-parser');
const isLogin = require('./middlewares/isLogin')
const Branches = require('./routes/branchesRoutes')
const ShippingRoute = require('./routes/shippingPriceModel')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use(cors());
app.use(express.json()); 

app.use('/', ShippingRoute);
app.use('/category',isLogin, categoriesRoute);
app.use('/', Branches);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//B9Igvw80Fb9BzDeW
//mongodb+srv://hishamhk12:B9Igvw80Fb9BzDeW@nuts.cstohlw.mongodb.net/?retryWrites=true&w=majority