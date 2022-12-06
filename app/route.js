
const { createOrder, getAllOrder, updateOrderByOrderId, deleteOrder,searchOrderbyOrderId } = require('./controller/order');

class Routes {
    routeToController = (app) => {
      // Create a new order
      app.post('/orders/create', createOrder);
      // Retrieve all product
      app.get('/orders/list', getAllOrder);
     //delete order
     app.delete('/orders/delete', deleteOrder);
    // Update a order detail with product Id
     app.put('/orders/update', updateOrderByOrderId);
     app.post('/orders/search', searchOrderbyOrderId);
    }
  }
  
module.exports = new Routes();
