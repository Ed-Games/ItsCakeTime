const fs = require('fs')
const path = require('path')

async function RemoveFile(file){
    const fp = path.resolve(__dirname,'..','uploads', file)
    console.log(__dirname)
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