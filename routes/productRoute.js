const express = require('express');
const { ViewProductpage, AddProductpage, insertproduct, deletProduct,statusChange, editProduct, UpdateProduct  } = require('../controllers/ProductController');
const path = require('path')

const routes = express.Router();

const multer = require('multer');

const st = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
})
const fileUpload = multer({storage : st}).single('image');

routes.get('/',ViewProductpage)
routes.get('/add',AddProductpage)
routes.post('/inserproduct',fileUpload,insertproduct)
routes.get('/deletProduct',deletProduct)
routes.get('/statusChange',statusChange)
routes.get('/editProduct',editProduct)
routes.post('/updateProduct',fileUpload,UpdateProduct)
// routes.post('/updateExsubcategory',updateExsubcategory)



module.exports = routes;