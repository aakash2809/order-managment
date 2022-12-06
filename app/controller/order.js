
const orderService = require('../services/order');

class OrderController {
   /**
     * @description create new order to database
     * @method createOrder is a service class method
     * @param {req, res}
     */
    createOrder = (req, res) => {
        try {
            console.log(req.body)
            const orderData = {
                order_id: req.body.order_id,
                item_name: req.body.item_name,
                cost: req.body.cost,
                order_date: new Date(req.body.order_date),
                delivery_date: new Date(req.body.delivery_date)
            };
            orderService.createOrder(orderData)
                .then((data) => {
                    console.log('order createed successfully !');
                    res.send({
                        status: 200,
                        message: 'order created successfully !',
                        data,
                    });
                })
                .catch((error) => {
                    console.log('Some error occurred while creating order', error);
                    res.send({
                        status: 500,
                        message: 'Some error occurred while creating order',
                    });
                });
        } catch (error) {
            console.log('Some error occurred while inserting a order');
            res.send({
                status: 500,
                message: `Some error occurred while inserting ${error}`,
            });
        }
    }
 
    /**
     * @description find all order in database
     * @method getBooks is service class method
     * @param {*} req holds user input
     * @param {*} res sends responce with data coming from Database
     */
     getAllOrder = (req, res) => {
        try {
            orderService.getOrders((error, data) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                } if (data.length == 0) {
                    console.log('order not found');
                    return res.status(404).send({
                        success: false,
                        message: 'order not found',
                    });
                }
                console.log('Successfully retrieved orders !');
                return res.status(200).send({
                    success: true,
                    message: 'Successfully retrieved orders !',
                    data,
                });
            });
        } catch (error) {
            console.log('Some error occurred !');
            res.status(500).send({
                success: false,
                message: `Some error occurred !${error}`,
            });
        }
    }

    /**
     * @description update order in database
     * @method update is service class method
     * @param res is used to send the response
     */
     updateOrderByOrderId = (req, res) => {
        try {
            const prodctData = {
                order_id: req.body.order_id,
                item_name: req.body.item_name,
                cost: req.body.cost,
                order_date: new Date(req.body.order_date),
                delivery_date: new Date(req.body.delivery_date)
            };
            orderService.updateOrder(prodctData, (error, data) => (
                error
                    ? (console.log(`Error updating order with id : ${req.body.order_id}`),
                        res.send({
                            status_code: 500,
                            message: `Error updating order with id : ${req.body.order_id}${error}`,
                        }))
                    : !data
                        ? (console.log(`order not found with id : ${req.body.order_id}${error}`),
                            res.send({
                                status_code: 400,
                                message: `order not found with id : ${req.body.orderId}${error}`,
                            }))
                        : console.log('order updated successfully !'),
                res.send({
                    status_code: 200,
                    message: 'order updated successfully !',
                    data,
                })
            ));
        } catch (error) {
            return (
                error.kind === 'ObjectId'
                    ? (console.log(`order not found with id ${error}${req.body.order_id}`),
                        res.send({
                            status_code: 404,
                            message: `order not found with id ${error}${req.body.order_id}`,
                        }))
                    : console.log(`Error updating order with id ${error}${req.body.order_id}`),
                res.send({
                    status_code: 500,
                    message: `Error updating order with id ${error}${req.body.order_id}`,
                })
            );
        }
    };

    /**
     * @description delet order with id
     * @method delete is service class method
     * @param response is used to send the response
     */
     deleteOrder = (req, res) => {
        try {
            const orderData = {
                orderId: req.body.order_id,
            };
            orderService.deleteOrder(orderData, (error, data) => (
                error
                    ? (console.log(`order not found with id ${req.body.order_id}`),
                        res.send({
                            status_code: 200,
                            message: `order not found with id ${req.body.order_id}`,
                        }))
                    : console.log('order deleted successfully!'),
                res.send({
                    status_code: 200,
                    message: 'order deleted successfully!',
                })
            ));
        } catch (error) {
            console.log(error.message);
            return (
                error.kind === 'ObjectId' || error.title === 'NotFound'
                    ? (console.log(`could not found  with id${req.body.order_id}`),
                        res.send({
                            status_code: 404,
                            message: `order not found with id ${req.body.order_id}`,
                        }))
                    : console.log(`Could not order with id ${req.body.order_id}`),
                res.send({
                    status_code: 500,
                    message: `Could not delete order with id ${req.body.order_id}`,
                })
            );
        }
    }

    searchOrderbyOrderId = (req,res) =>{
        try{
            orderService.filterOrder(req.body.order_id, (error, data) =>{
                if(error){
                    res.send({
                        status_code: 404,
                        message: `order found not with id ${req.body.order_id}`,
                    })
                }else{
                    res.send({
                        status_code: 200,
                        message: 'order found successfully!',
                        data: data
                    })
                }
            })

        }catch(error){
            res.send({
                status_code: 500,
                message: error.message,              
            })
        }
    }

  }
  
  module.exports = new OrderController();