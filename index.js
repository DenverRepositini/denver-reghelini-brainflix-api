require( 'dotenv' ).config();

const express = require('express')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT 

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const videosRouter = require('./routes/videos')

app.use('/videos', videosRouter)


app.listen(8000 ,()=> {
    console.log('Server started on localhost 8000');
    console.log('Press Ctrl + C to stop server');
})
