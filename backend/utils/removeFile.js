const fs = require('fs')
const path = require('path')

async function RemoveFile(file){
    const fp = path.resolve(__dirname,'..','..','uploads', file)
    console.log('path: ', fp)
    fs.unlink(fp, (err) => {
        if (err) {
          console.error(err)
          return
        }
      
        //file removed
      })
}


module.exports = {
    RemoveFile
}