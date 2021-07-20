import Sequelize from "sequelize";
import OrderModel from '../models/orderModel.js';

var sequelize = new Sequelize('ordersDatabase', 'root', 'pass', {
	host : 'localhost',
	dialect : 'sqlite',

	pool : {
		max : 10,
		min : 0,
		idle : 10000 
	},

	storage : '../database.sqlite',
	logging: false
});

//	Model table name will be the same as the model name
const Order = sequelize.define('order', OrderModel, { freezeTableName : true });


/**
 * Create new order
 */
const createOrder = function(order, onResult) {

    if (order.totalPrice && order.shippingAddress) {      
        Order.create(order).then(function(orderDB) {
                onResult(orderDB);          
        }, function(error) {
            onResult(null, error);
        });
    } else {
        onResult(null, "wrong data");
    }  
};

//  Retrieve an order given it's id.
const getOrderById = function(orderId, onResult) {
    Order.findOne({
        where: {
            id: orderId
        }
    }).then(onResult);
};


//  Converts Object to JSON object (when saving elements in the DB).
function convertJSONtoOBJ(object) {
    try {
        var jsonObj = JSON.parse(object);
        if (jsonObj) jsonObj = jsonObj.get({ plain: true });
    }
    catch(e) { console.log(e.stack); } 
}

//  Converts JSON object to Object (when retrieving elements from the DB).
function convertOBJtoJSON(obj) {
    for (var field in obj) {
        if (field && obj.hasOwnProperty(field)) {
            try { obj.field = JSON.stringify(obj.field); }
            catch (e) { console.log(e.stack); }
        }
    }
}

Order.beforeValidate(convertOBJtoJSON);
Order.afterFind(convertJSONtoOBJ);


function initdb(){
    console.log('INITIALIZATION OF DB', "db_sqlite");
    Order.sync();
    sequelize.sync();
}

initdb();

export { createOrder, getOrderById };