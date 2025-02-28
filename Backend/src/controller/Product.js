
const {Router}= require('express');
const { productupload } = require('../../multer');
const Productmodel = require('../Model/Productmodel');
const userModel = require("../Model/userModel");
const productrouter=Router();
const path = require('path');
const { userInfo } = require('os');

productrouter.get("/get-product", async (req, res) => {
    try {
        const productfind = await Productmodel.find();
        console.log(productfind);
        if (!productfind) {
            return res.status(400).json({ message: "No products found" });
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

        return res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


productrouter.post('/cart',async(req,res)=>{
    const {email,productid,productname,quantity}=req.body

    try{
        if(!email){
            return res.status(404).json({message: "fill all inputbox"})
        }
       
        if(!mongoose.types.objectId.isValid(productid)){
            return res.status(400).json({message:'product is not there'})
        }  
        if(!quantity&& quantity<0){
            return res.status(400).json({message:'you dont have neccessary quantity'})
        }

        const findemail=await userModel.findOne({email:email})
        if(!findemail){
            return res.status(440).json({message: 'user does not exist'})
        }
        const findproduct=await Productmodel.findById(productid)
        if(!findproduct){
            return res.status(400).json({message:'product is not exist '})
        }


        const cartproductid=await findemail.cart.findIndex((i)=>{
            return i.productid===productid
        })
  
        if(cartproductid>-1){
            findemail.cart[cartproductid].quantity+=quantity
        }
        else{
            findemail.cart.push({productid,productname,quantity})
        }

    }
    catch(err){
        console.log("error in cart")
    }
})


productrouter.get('/getcart',async(req,res)=>{
     try{
    const {email}=req.body
    if(!email){
        return res.status(400).json({message:"email does not exist"})
    }
    const user=await userModel.findOne({email:email}).populate({
        path:'cart.productid',     
        model:Productmodel
    })

    if(!user){
        return res.status(400).json({message:"user does not exist"})
    }

    return res.status(400).json({message:"cart is shown successfully"})

}
catch(err){
    console.log("error in cart for get req")
}

})

productrouter.post("/post-product", productupload.array('files'), async (req, res) => {
    const { name, description, category, tags, price, stock, email } = req.body;
    const images = req.files.map((file) => file.path);
    try {
        const seller = await Productmodel.findOne({ email: email });
        if (!seller) {
            return res.status(400).json({ message: "Seller not found" });
        }
        if (images.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }
        const newproduct = await Productmodel.create({
            name: name,
            description: description,
            category: category,
            tags: tags,
            price: price,
            stock: stock,
            email: email,
            images: images
        });
        res.status(200).json({ message: "Product added successfully", product: newproduct });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.put('/edit-product/:id', productupload.array('files', 10), async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { name, description, category, tags, price, stock, email } = req.body;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }
        let updateimages = existproduct.images;
        if (req.files && req.files.length > 0) {
            updateimages = req.files.map((img) => {
                return `/product/${path.basename(img.path)}`;
            });
        }
        existproduct.name = name;
        existproduct.description = description;
        existproduct.category = category;
        existproduct.tags = tags;
        existproduct.price = price;
        existproduct.stock = stock;
        existproduct.email = email;
        existproduct.images = updateimages;

        await existproduct.save();

        res.status(200).json({ product: existproduct });
    } catch (err) {
        console.log('error in updating');
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }

        await existproduct.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log('error in delete');
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=productrouter;
