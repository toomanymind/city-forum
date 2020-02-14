const { models } = require('../../db/connector')
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
const upload = multer({ storage: storage }).single('avatar')

let setApiUsers = function(router) {
  router.get('/getUsers', (req, res) => {
    let result = models.users.getAll()
    res.send(result)
  })
  router.post('/addUser', (req, res) => {
    let { name, password } = req.body
    models.users.add({ name, password, avatar: '' })
    res.send('success')
  })
  router.post('/deleteUser', (req, res) => {
    let { id } = req.body
    models.users.del({ id })
    res.send('success')
  })
  router.post('/updateUser', (req, res) => {
    let { id, name, password } = req.body
    models.users.update({ id, name, password })
    res.send('success')
  })
  router.get('/getUserById', (req, res) => {
    let { id } = req.query
    let result = models.users.getById({ id })
    res.send(result)
  })
  router.post('/updateUserAvatar', (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        res.send('upload fail.')
        return
      }
      let { id } = req.body
      let url = `/${req.file.filename}`

      models.files.add({ fileId: req.file.id.toString(), url })
      models.users.update({ id, avatar: url })
      res.send('upload avatar success.')
    })
  })
}

module.exports = setApiUsers

