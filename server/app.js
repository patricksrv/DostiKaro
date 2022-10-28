const express =require('express')
const app = express()
const PORT = 5000;
const mongoose = require('mongoose')
const {MONGO_URL} = require('./keys')

// iVakx0Rm4Zm9ZBp0

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting", err);
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(PORT, () => {
    console.log("Server is running at", PORT);
})