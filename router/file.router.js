const express = require('express')
const router = express.Router()
const fileService = require('../services/file.service')
const multer = require('multer')
const handleFiles = multer({})

router.get('/', async (req, res) => {
  try {
    const { path } = req.query
    let filesNames
    if (path) {
      filesNames = await fileService.getFilesByPath(path)
    } else {
      filesNames = await fileService.getAllFiles({})
    }

    res.send(filesNames)
  } catch (err) {
    res.status(err.code || 400).send(err.message)
  }
})

// router.get('/:pathName', async (req, res) => {
//     try {
//         console.log(req.query)
//         const fileName = await fileService.getFileByPath(req.query)
//         res.send(fileName)
//     } catch (err) {
//         res.status(err.code || 400).send(err.message)
//     }
// })

router.post('/', handleFiles.single('file'), async (req, res) => {
  try {
    const {path} = req.query
    const newFile = await fileService.addFile(req.file, path)
    res.send(newFile)
  } catch (err) {
    res.status(err.code || 400).send(err.message)
  }
})

router.post('/create-folder', async (req, res) => {
    try {
        const {path} = req.query
        const {folderName} = req.body
        const newFolder = await fileService.addFolder(folderName, path)
        res.send(newFolder)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
})

module.exports = router
