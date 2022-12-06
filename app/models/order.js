const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item_name:{
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
},
  order_date: {
    type: Date,
    required: true,
},
  delivery_date: {
    type: Date,
    required: true,
},
},
{
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

class OrderModel {
    /**
     * @description saving Order into buckets
     * @param {*} orderData holds user input data
     * @param {*} callback is for service class method
     */
    save = async (orderData, callback) => {
        const order = new Order(orderData);
        await order.save((error, orderResult) => {
            error ? callback(error, null) : callback(null, orderResult);
        });
    }

    /**
     * @description get orders from database
     * @param {*} callback is for service class holds error and user
     */
    getOrders = async (callback) => {
        try{
            let result = await Order.find({})
            callback(null, result);
        }catch(error){
            callback(error, null);
        }
    }

    /**
     * @description update a order
     * @param {*} orderData
     * @param {*} callback
     */
    update = async (orderData, callback) => {
        try{
        const {order_id } = orderData;
        console.log(order_id )
        const result = await Order.findByIdAndUpdate( {_id: order_id}, orderData,{ new: true });
        callback(null, result)
        }catch(error){
            callback(error, null)
        }
    }

    /**
     * @description delete a order
     * @param {*} orderData
     * @param {*} callback
     * @returns data of remove method
     */
    delete = (orderData, callback) => {
        Order.findByIdAndDelete({_id: orderData.orderId}, (error, orderResult) => {
            error ? callback(error, null) : callback(null, orderResult);
        });
    }

     /**
     * @description search a order
     * @param {*} orderData
     * @param {*} callback
     * @returns filtered result
     */
    search = (orderId, callback) => {
        console.log('orderId', orderId);
        Order.findById({_id: orderId}, (error, orderResult) => {
            error ? callback(error, null) : callback(null, orderResult);
        });
    }
}

module.exports = new OrderModel();