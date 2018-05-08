const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders page'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders create page',
        createdOrder: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: "Order page",
        id: id
    });
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: "Order deleted",
        id: id
    });
});

module.exports = router;