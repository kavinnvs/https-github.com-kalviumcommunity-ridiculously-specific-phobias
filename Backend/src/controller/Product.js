const {Router} = require('express');
const { default: productModel } = require('../Model/productModel');
const productRouter = Router();

productRouter.get("/get-product",async(req,res)=>{
    try{
        const productFind = await productModel.find();
        const products =productFind.map((product)=>{
            return{
                name:product.name,
                description:product.description,
                category:product.category,
                tags:product.tags,
                price:product.price,
                stock:product.stock,
                email:product.email,
                images:product.images,
            };
        });
        res.status(200).json({products:products});
    }
    catch(error){
        console.log(err);
    }
});


productRouter.get('/',(req,res)=>{
    res.send('Product Route');
})
 productRouter.post('/',productUpload.array('files'),async(req,res)=>{
    try{
        const {name,description,price,stock,email,img,category,tag}=req.body;
        const images = req.files.map(file => file.path) ;
        try {
            const seller = await productModel.findOne({email:email})
           if(!seller){
            return res.status(400).json({message:"Please upload atleast one image"})
           }
           if(images.length===0) {
            return res.status(400).json({message:"Please upload atleast one image"})

           }
           const newproduct = await productModel.create({
            name:name,
            description:description,
            category :category,
            tags: tags,
            price:price,
            stock:stock,
            email:email,
            images:images,

           })
        } catch (error) {
            console.log(error);
        }
        
 }
 catch(error){
    console.log("error");
 }
});


 module.exports = productRouter;