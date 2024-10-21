const categoryModle = require('../models/CatagoryModle')
const subcategoryModle = require('../models/SubCategoryModle')
const exsubcategoryModle = require('../models/ExsubcategoryModle')
const productModle = require('../models/ProductModle')
const path = require('path')

const ViewProductpage =  async(req,res) =>{
    try {
        let product = await productModle.find({}).populate("exsubcategoryId").populate("subcategoryId").populate("categoryId");
        // console.log(product);
        
        return res.render('product/view_product',{
            product :product
        })
        
    } catch (error) {
        console.log(error);
        return false;
    }

}
const AddProductpage = async(req, res) => {
    try {
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({})
        const exsubcategory = await exsubcategoryModle.find({})
        return res.render('product/add_product',{
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory
        })
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
const insertproduct = async (req, res) => {
    // console.log(req.body.category);
    try {
        const{category, subcategory,exsubcategory,product,description,qnty,price,} = req.body;
        console.log(req.body);
        console.log(req.file.path);
        await productModle.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId:exsubcategory,
            product:product,
            description:description,
            qnty:qnty,
            price:price,
            image: req.file.path
        })
        console.log('Added Product...');
        return res.redirect('/product')


    } catch (error) {
        console.log(error);
        return false;

    }

}
const deletProduct =async(req,res) =>{
    try {
        const deleteid = req.query.deleteId
         await productModle.findByIdAndDelete(deleteid)
         console.log('Product Deleted...');
         return res.redirect('/product')

        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
const editProduct = async (req, res) => {
    try {
       let editid = req.query.editid;
       
       
        // console.log(editid);
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({})
        const exsubcategory = await exsubcategoryModle.find({})
        const single = await productModle.findById(editid);
       
        
        
        return res.render('product/edit_product', {
            single:single,
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}
const statusChange = async(req,res) =>{
    try {
        const status = req.query.status;
        const statusid = req.query.statusid;
        // console.log(status,statusid);
        if(status == 'active'){
            await exsubcategoryModle.findByIdAndUpdate(statusid,{
                status: 'inactive'
            })
            console.log('Category Status Changed to Inactive...');
            return res.redirect('/exsubcategory')
        }else{
            await exsubcategoryModle.findByIdAndUpdate(statusid,{
                status: 'active'
            })
            console.log('Category Status Changed to Active...');
            return res.redirect('/exsubcategory')
        }
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
const UpdateProduct = async (req, res) => {
    // console.log(req.body.category);
    try {
        const { id, category, subcategory, exsubcategory, product, description, qnty, price } = req.body;
        console.log(req.body);

        // Prepare the update object
        const updateData = {
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            product: product,
            description: description,
            qnty: qnty,
            price: price
        };

        // Check if an image file is provided
        if (req.file && req.file.path) {
            updateData.image = req.file.path;
        }

        // Update the product in the database
        await productModle.findByIdAndUpdate(id, updateData);
        console.log('Updated Product...');
        
        return res.redirect('/product');
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while updating the product.');
    }

}


module.exports ={
    ViewProductpage,AddProductpage,insertproduct,deletProduct,editProduct,statusChange,UpdateProduct
}