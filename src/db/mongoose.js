const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://oministack:oministack@oministack-kokfb.mongodb.net/cus-analytics?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    console.log('Connected to DB!');
}).catch(() => {
    console.log('Error tp Connect to DB!');
});