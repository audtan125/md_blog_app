const mongoose = require('mongoose')

// libraries that allow markdown function to work
const { marked } = require('marked')
//const marked = require('marked') <- this threw an error for whatever reason
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    sanitisedHtml: {
        type: String,
        required: true
    },
    // a thread is the topic of conversation
    thread: {
        type: String,
        required: true
    } 
})

ArticleSchema.pre('validate', function(next) {
    if (this.markdown) {
        this.sanitisedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

// the string passed in is the title of the database
module.exports = mongoose.model('article', ArticleSchema)