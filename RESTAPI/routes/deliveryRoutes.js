var express = require('express');
var router = express.Router();
const {
   deleteDelivery,
   getDeliveries,
   getDeliveryById,
   saveDelivery,
   updateDelivery
} = require("../controllers/deliveryController");
const { get } = require('mongoose');

router.route('/').get(getDeliveries)
router.route('/:id').get(getDeliveryById).post(saveDelivery).put(updateDelivery).delete(deleteDelivery)

module.exports = router