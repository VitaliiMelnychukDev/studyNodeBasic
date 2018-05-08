const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products page'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Products page post',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
       res.status(200).json({
           message: "id special product",
           id: id
       });
    } else {
        res.status(200).json({
            message: "Id not exist"
        });
    }

});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Update product"
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Delete product"
    });
});

module.exports = router;