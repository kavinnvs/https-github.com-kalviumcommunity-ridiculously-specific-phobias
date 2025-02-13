const { Router } = require('express');
const { productUpload } = require('../../multer');
const productRouter = Router();
const productModel = require('../../models/productModel'); // Assuming you have a model file for products

// Get route
productRouter.get('/', (req, res) => {
    res.send('Product Route');
});

// Create product route
productRouter.post('/', productUpload.array('files'), async (req, res) => {
    const { name, description, category, tags, stock, email, price } = req.body;
    const images = req.files.map(file => file.path);
    try {
        const seller = await productModel.findOne({ email: email });
        if (!seller) {
            return res.status(400).json({ message: 'Seller not found' });
        }

        if (images.length < 1) {
            return res.status(400).json({ message: 'Please upload at least one image' });
        }

        const newProduct = await productModel.create({
            name: name,
            description: description,
            category: category,
            tags: tags,
            stocks: stock,
            email: email,
            price: price,
            images: images
        });

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update product route
productRouter.put('/:id', productUpload.array('files'), async (req, res) => {
    const { id } = req.params;
    const { name, description, category, tags, stock, email, price } = req.body;
    const images = req.files.map(file => file.path); // Optional for updating images

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (email && product.email !== email) {
            return res.status(403).json({ message: 'Unauthorized to update this product' });
        }

        // Update fields
        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;
        if (tags) product.tags = tags;
        if (stock) product.stocks = stock;
        if (price) product.price = price;
        if (images.length > 0) product.images = images; // Only update images if provided

        const updatedProduct = await product.save();
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

module.exports = productRouter;
