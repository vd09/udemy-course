const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/authorization");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ msg: "Product was not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post(
    "/",
    [
        auth,
        [
            check("name", "Name is Required").not().isEmpty(),
            check("description", "Description is Required").not().isEmpty(),
            check("category", "Category is Required").not().isEmpty(),
            check("price", "Price is Required").not().isEmpty(),
            check("quantity", "Quantity is Required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, description, category, price, brand, quantity } =
                req.body;
            const newProduct = new Product({
                userId: req.user.id,
                name,
                description,
                category,
                price,
                brand,
                quantity,
            });
            const product = await newProduct.save();
            res.json({ product });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
