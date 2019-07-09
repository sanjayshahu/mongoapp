const express = require('express');
require('./db/mongoose');
const userRoutes=require('./routers/userRouter');
const app = express();
const port = process.env.PORT || 3001;
// app.use((req,res,next)=>{
// res.status(503).send("server under maintenance");

// })

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
        console.log("sever is up at " + port)
    }

)