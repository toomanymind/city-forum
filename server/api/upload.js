const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../files'))
  },
  filename: function (req, file, cb) {
    let fileId = Date.now()
    file.id =fileId
    let ext = (file.originalname.match(/\.(\w+)$/) || [])[1] || 'ext'
    cb(null, `${fileId}.${ext}`)
  }
})
const upload = multer({ storage: storage })
const { models } = require('../../db/connector')

let setApiUpload = function(router) {
  router.post('/upload', upload.single('file'), (req, res) => {

    let { id, filename } = req.file
    models.files.add({
      fileId: id.toString(),
      url: `/${filename}`
    })

    res.send('uploaded.')
  })
}

module.exports = setApiUpload

