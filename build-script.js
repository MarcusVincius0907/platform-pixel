const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')

const ignoreList = ['assets', 'icons', 'index.html']
const directoryPath = './dist'
const serverDistPath = './server/dist'

function deleteFolderRecursive(directoryPathParam, verifyContent = true) {
  try {
    if (fs.existsSync(directoryPathParam)) {
      fs.readdirSync(directoryPathParam).forEach((file) => {
        const curPath = path.join(directoryPathParam, file)
        let nignoreList = verifyContent ? ignoreList : []
        if (!nignoreList.includes(file)) {
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
      fs.rmdirSync(directoryPathParam)
    }
  } catch (e) {
    console.log('Error in deleteFolderRecursive', e)
  }
}

async function main() {
  try {
    // Delete all contents of the directory except for the ignore list
    deleteFolderRecursive(directoryPath)
  } catch (e) {
    console.log('ERROR in first step deleting folders and files from dist --> ', e.toString().substring(0, 10) + '...')
  }

  try {
    // Create assets/icons directory and move icons folder into it
    const sourcePath = './dist/icons'
    const targetPath = './dist/assets/icons'
    fs.renameSync(sourcePath, targetPath)

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
    fs.renameSync(directoryPath, serverDistPath)
  } catch (e) {
    console.log('ERROR in third step moving dist to server --> ', e.toString().substring(0, 10) + '...')
  }

  fse.removeSync(directoryPath)

  console.log('End of process')
}

main()
