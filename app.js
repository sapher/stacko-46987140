const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer')
const morgan = require('morgan')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({
    storage: storage
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.post('/uploads', upload.array('images'), (req, res) => {
    console.log(req.files);
    return res.send(req.files);
})

app.listen(8000, () => {
    console.log(`server is listenning on port 8000`)
})
