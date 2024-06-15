const fs = require('fs')

async function getAllFiles() {
  const filesNames = fs.readdirSync('root/public')
  return filesNames
}

// in the client I build the pathname in a way that he'll look like the structure in the root/public folder
async function getFilesByPath(pathName) {
  const isFileDirectory = fs.statSync(`root/public${pathName}`).isDirectory()

  if (isFileDirectory) {
    const filesNames = fs.readdirSync(`root/public${pathName}`) // returns array of files names in the directory
    return filesNames
  } else {
    const fileStats = fs.statSync(`root/public${pathName}`)
    // atimeNs - last access time; mtimeNs - last modified time
    const {birthtimeMs, atimeMs, mtimeMs, size} = fileStats
    return {birthtimeMs, atimeMs, mtimeMs, size}
  }
}

async function addFile(newFile, path) {
  const id = _generateId()
  newFile = { ...newFile, id }
  fs.writeFileSync(
    `root/public${path}/${newFile.originalname}`,
    newFile.buffer
  )
  return newFile
}

async function addFolder(folderName, path) {
    if (folderName) fs.mkdirSync(`root/public${path}/${folderName}`)
    return folderName
}

async function removeFile(path) {
    const isDirectory = fs.statSync(`root/public${path}`).isDirectory()
    if (isDirectory) fs.rmSync(`root/public${path}`, {recursive: true})
    else fs.unlinkSync(`root/public${path}`)
}

async function renameFile(path, newPath) { //also for dir and file
  fs.renameSync(`root/public${path}`, `root/public${newPath}`)
}

function _generateId() {
  return getRandomIntInclusive(1000, 10000)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

module.exports = { getAllFiles, getFilesByPath, addFile, addFolder, removeFile, renameFile }
