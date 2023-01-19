const express = require('express')
const router = express.Router()

const methodOverride = require('method-override')
router.use(methodOverride('_method'))

const Article = require('../models/article')

// helps with getting form data by decoding form url
router.use(express.urlencoded({
    extended: false
}));

router.get('/', async (req, res) => {
    // pass in articles object into render

    const articles = await Article.find({ thread: 'cs' })
    res.render('cs-index', { articles: articles })
})

router.get('/post', (req, res) => {
    res.render('post')
})

router.post('/post', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        markdown: req.body.markdown,
        thread: 'cs'
    })
    try {
        article = await article.save()
        res.redirect(`/cs/${article.id}`)
    } catch (e) {
        console.log(e)
    }

})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('fullarticle', { fullarticle: article })
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/cs')
})

module.exports = router