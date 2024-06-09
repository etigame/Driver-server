const fs = require('fs')

async function getAllFiles() {
  const filesNames = fs.readdirSync('root/public')
  return filesNames
}

// in the client I build the pathname in a way that he'll look like the structure in the root/public folder
async function getFilesByPath(pathName) {
  const isFileDirectory = fs.statSync(`root/public${pathName}`).isDirectory()

  if (isFileDirectory) {
    const filesNames = fs.readdirSync(`root/public${pathName}`)
    return filesNames
  } else {
    const fileStats = fs.statSync(`root/public${pathName}`)
    // atimeNs - last access time; mtimeNs - last modified time
    const {birthtimeMs, atimeMs, mtimeMs, size} = fileStats
    return {birthtimeMs, atimeMs, mtimeMs, size}
  }
}

async function addFile(newFile) {
  const id = _generateId()
  newFile = { ...newFile, id }
  fs.writeFileSync(
    `root/public/uploads/${newFile.originalname}`,
    newFile.buffer
  )
  return newFile
}

function _generateId() {
  return getRandomIntInclusive(1000, 10000)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

module.exports = { getAllFiles, getFilesByPath, addFile }
