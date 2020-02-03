const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
var cors = require('cors');
const app = express();


 mongoose.connect('mongodb+srv://oministack:oministack@oministack-kokfb.mongodb.net/cus-analytics?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false,

},);
 
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000);

