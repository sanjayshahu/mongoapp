var mongoose = require('mongoose');

var connectionUrldb = "mongodb://127.0.0.1:27017/testRestDb";
mongoose.connect(connectionUrldb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:false
    }
)

