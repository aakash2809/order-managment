const orderModel = require('../models/order');

class OrderService {
    /**
     * @description calling model class method to add new order to schema
     * @method save is model class method
     * @param {*} orderData holds order detail
     * @returns callback function
     */
    createOrder = async (orderData) => await orderModel.save(orderData, (error, data) => {
        (error) || data;
    })

    /**
     * @description get orders
     * @method getAllorders is a model class method
     */
    getOrders= (callback) => {
        orderModel.getOrders(((error, data) => error ? callback(error, null): callback(null, data)))
    }

    /**
     * @description update a order by id
     * @method update is model class methodholds orderdata
     * @param {*}orderData holds user input update data
     * @param {*} callback is for controller class methods
     * @returns callback
     */
    updateOrder = (orderData, callback) => orderModel.update(orderData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

    /**
     * @description delete a order by its id
     * @param {*} orderData holds user input data
     * @param {*} callback is for controller class method
     * @method delete is models class method
     * @returns callback
     */
    deleteOrder = (orderData, callback) => orderModel.delete(orderData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

    /**
     * @description delete a order by its id
     * @param {*} orderId holds user input data
     * @param {*} callback is for controller class method
     * @method search is models class method
     * @returns callback
     */
    filterOrder = (orderId, callback) => orderModel.search(orderId, (error, data) => ((error) ? callback(error, null) : callback(null, data)))
}

module.exports = new OrderService();