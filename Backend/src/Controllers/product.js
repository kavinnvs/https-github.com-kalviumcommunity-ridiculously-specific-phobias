const {Router} = require('express');
const { productupload } = require('../../multer');
const productModel = require('../Model/Productmodel');
const productrouter = Router();
const path=require('path');
const userModel = require('../model/userModel');
const { default: mongoose } = require('mongoose');

productrouter.get("/get-product", async (req, res) => {
    try{
       const productfind= await productModel.find();
         console.log(productfind);
        if(!productfind){
            return res.status(400).json({message:"No products found"});
        }
        const products = productfind.map((product) => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                tags: product.tags,
                price: product.price,
                stock: product.stock,
                email: product.email,
                images: product.images,
                createdAt: product.createdAt,

            };
        });

        return  products
        
    }
    catch(err){
        console.log(err);
    }
});

productrouter.post('/cart',async(req,res)=>{
    const {email,productid,productname,quantity}=req.body
    try{
        const user=await userModel.findOne({email:email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const product=await productModel.findById(productid)
        if(!product || !email || !productname || !quantity){
            return res.status(404).json({message:"Fill all inputBox"})
        }
        const findmail= await userModel.findOne({email:email})
        if(!findmail){
            return res.status(404).json({message:"User doesnot exist"})

        }

        if(!mongoose.Types.ObjectId.isvalid(productid)){
            return res.status(400).json({message:"Product does not exist"})
        }
        const findproduct=await productModel.findById(productid)
        if(!findproduct){
            return res.status(400).json({message:"Product does not exist"})
        }
        if(!quantity && quantity < 0){
            return res.status(400).json({message:"Please enter quantity"})
        }
        const cartproductid = await userModel.findIndex((i) => {
            return i.productid === productid;
        })
        if(cartproductid > -1){
            userModel.cart[cartproductid].quantity += quantity;
        }
        else{
            userModel.cart.push({
                productid,
                productname,
                quantity,
            });
        }
    }catch(err){
        console.log('error in the cart')
    }
})

productrouter.post("/post-product",productupload.array('files'),async(req, res) => {
    const {name, description, category, tags, price, stock, email} = req.body;
    const images = req.files.map((file) => file.path);
    try{
        const product = await productModel.findone({email:email});
        if(!seller){
            return res.status(400).json({message:"Seller not found"});
        }
        if(images.length === 0){
            return res.status(400).json({message:"Please upload atleast one images"});
        }
        await productModel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        });
    }
    catch(err){
        console.log(err);
    }
    res.status(200).json({message:"Product added successfully"});

});

productrouter.get('/getcart',async(req,res)=>{
    try{
        const {email}=req.body
        
        if(!email){
            return res.status(400).json({message:"User not found"})
        }
        const user=await userModel.findOne({email:email}).populate({
            path:cart.productid,
            model:productModel,
        })

        if (!user){
            return res.status(400).json({message:"User not found"})
        }

        return res.status(400).json(message:"cart is shown successfully")



        
    }
    catch(err){
        console.log('error in getting cart')

    }
})

productrouter.put('/edit-product/:id',productupload.array('files',10),async(req,res)=>{

    try{
    const {id}=req.params
    console.log(id)
    const {name, description, category, tags, price, stock, email} = req.body;
    const existproduct=await productModel.findById(id)

    if(!existproduct){
        res.status(400).json({message:"product does not exist"})
    }
    const updateimages=existproduct.images
    if(req.files && req.files.length>0){
        updateimages=req.files.map((img)=>{
            return `/product/${path.basename(img.path)}`
        })
    }
    existproduct.name=name
    existproduct.description=description
    existproduct.category=category
    existproduct.tags=tags
    existproduct.price=price
    existproduct.stock=stock
    existproduct.email=email
    existproduct.images=updateimages

   await existproduct.save()

    res.status(200).json({product:existproduct})

    }
    catch(err){
        console.log('error in updating')
    }

})

productrouter.delete('/delete-product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const existproduct=await productModel.findById(id)

        if(!existproduct){
            res.status(400).json({message:"product does not exist"})
        }

        await existproduct.deleteOne()

    }catch(err){
        console.log('error in delete')
    }
})

module.exports = productrouter;