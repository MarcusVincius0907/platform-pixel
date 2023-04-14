const fs = require('fs')
const path = require('path')

const ignoreList = ['assets', 'icons', 'index.html']
const directoryPath = './dist'
const serverDistPath = '../server/dist'

function main() {
  try {
    const deleteFolderRecursive = function (directoryPath) {
      if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
          const curPath = path.join(directoryPath, file)
          if (!ignoreList.includes(file)) {
            if (fs.lstatSync(curPath).isDirectory()) {
              // Recursively delete any subdirectories
              deleteFolderRecursive(curPath)
            } else {
              // Delete the file
              fs.unlinkSync(curPath)
            }
          }
        })
        // After deleting all contents, delete the directory itself
        fs.rmdirSync(directoryPath)
      }
    }

    // Delete all contents of the directory except for the ignore list
    deleteFolderRecursive(directoryPath)
    // Recreate the directory without any files or subdirectories
    fs.mkdirSync(directoryPath)
  } catch (e) {
    console.log('ERROR in first step deleting folders and files from dist --> ', e.toString().substring(0, 10) + '...')
  }

  try {
    // Create assets/icons directory and move icons folder into it
    const sourcePath = './dist/icons'
    const targetPath = './dist/assets/icons'
    fs.mkdirSync(targetPath, { recursive: true })
    fs.renameSync(sourcePath, path.join(targetPath, 'icons'))

    // Update references to /icons in index.html to /assets/icons
    const indexPath = './dist/index.html'
    let indexHtml = fs.readFileSync(indexPath, 'utf8')
    indexHtml = indexHtml.replace(/\/icons/g, '/assets/icons')
    fs.writeFileSync(indexPath, indexHtml)
  } catch (e) {
    console.log(
      'ERROR in second step moving icons to assets and changing html reference --> ',
      e.toString().substring(0, 10) + '...',
    )
  }

  try {
    // Move the dist folder to the server directory
    const serverDistExists = fs.existsSync(serverDistPath)
    if (serverDistExists) {
      // Delete the existing server/dist folder and its contents
      deleteFolderRecursive(serverDistPath)
    }
    fs.mkdirSync(serverDistPath, { recursive: true })
    fs.renameSync(directoryPath, path.join(serverDistPath, 'dist'))
    // Delete the original dist folder
    deleteFolderRecursive(directoryPath)
  } catch (e) {
    console.log('ERROR in third step moving dist to server --> ', e.toString().substring(0, 10) + '...')
  }

  console.log('End of process')
}

main()
