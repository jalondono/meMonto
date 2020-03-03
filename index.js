const app = require('./server');
const { PORT, MONGO_URI } = require('./src/config');
const mongoose = require('mongoose');

async function main() {
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useFindAndModify: false}).then(() => {
        app.listen(PORT, () => {
        console.log('listen on port : 3000')
    });
    }).catch(() => {
        console.error("Can't Connect to Database")
    });
}
main()