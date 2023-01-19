// start mongodb with command below in mac's terminal
// brew services start mongodb-community@6.0


const express = require('express') // imports express
const app = express() // sets up server

// sets up math router so that everything in math.js file will have url /math preceding it
const mathRouter = require('./routes/math')
app.use('/math', mathRouter)

const csRouter = require('./routes/cs')
app.use('/cs', csRouter)

// helps with getting form data by decoding form url
app.use(express.urlencoded({
    extended: false
}));

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/LearningExperimentsBlog')

// TO-DO: Import both articles and render them all
const Article = require('./models/article')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// tell app to render pages in ejs
app.set('view engine', 'ejs')

app.listen(3000) // port number

app.get('/', async (req, res) => {
    // pass in articles object into render
    const Articles = await Article.find()
    res.render('all-index', { Articles: Articles })
})

