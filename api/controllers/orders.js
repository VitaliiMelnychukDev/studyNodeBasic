const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const config = require('../../config');

module.exports.ordersGetAll = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .then(orders => {
            res.status(200).json({
                count: orders.length,
                orders: orders.map(order => {
                    return {
                        product: order.product,
                        quantity: order.quantity,
                        _id: order._id,
                        request: {
                            type: 'GET',
                            url: config.BASE_URL + 'orders/' + order._id
                        }
                    }
                })

            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
};

module.exports.orderCreate = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    "message": "Product does not found"
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });

            return order.save();
        }).then(result => {
        res.status(201).json({
            "message": "Order saved",
            "order": {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: config.BASE_URL + 'orders/'
            }
        });
    }).catch(err => {
        res.status(500).json(err);
    });
};

module.exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId)
        .select('product quantity _id')
        .populate('product', 'name _id')
        .then(order => {
            if (order) {
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: config.BASE_URL + 'orders/'
                    }

                });
            } else {
                res.status(404).json({
                    "message": "Order does not exist!"
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

module.exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id: id}).then(result => {
        res.status(200).json({
            message: "Order deleted successfully!"
        })
    }).catch(err => {
        res.status(500).json({error: err});
    });
};