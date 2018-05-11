const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');
const config = require('../../config');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    request: {
                        type: 'GET',
                        url: config.BASE_URL + 'products/' + product._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(201).json({
            message: 'Product created successfully',
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                request: {
                    type: 'GET',
                    url: config.BASE_URL + 'products/' + result._id
                }
            }
        });
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .then(product => {
        if (product) {
            res.status(200).json({
                product: product,
                request: {
                    type: 'GET',
                    url: config.BASE_URL + 'products/'
                }
            });
        } else {
            res.status(404).json({
                "message": "Product does not exist"
            });
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps}).then(result => {
        res.status(200).json({
            message: 'Product updated successfully!',
            request: {
                type: 'GET',
                url: config.BASE_URL + 'products/' + id
            }
        })
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).then(result => {
        res.status(200).json({
            message: "Product deleted successfully!"
        })
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = router;