
const mongoose = require('mongoose');

exports.connectDb = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
     .then(console.log('Database Connect Hogya😊'))
     .catch((err) => console.error('Error In Db Connection',err))
}