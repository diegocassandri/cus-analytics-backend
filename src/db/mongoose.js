const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    console.log('Connected to DB!');
}).catch(() => {
    console.log('Error tp Connect to DB!');
});