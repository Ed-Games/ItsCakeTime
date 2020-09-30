const multer = require('multer')

const storage = multer.diskStorage({
    destination: (request,file, callback) =>{
        callback(null,'./uploads/')
    },

    filename : (request, file, callback) => {
        callback(null, Date.now()+'-'+file.originalName)
    }
})

const upload = multer({storage})

module.exports = upload