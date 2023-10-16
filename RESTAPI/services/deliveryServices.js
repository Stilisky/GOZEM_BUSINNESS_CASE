const deliveryModel = require('../models/Delivery')

const  findDeliveries = async () => {
   const deliveries = await deliveryModel.find()
   const deliv = []
   deliveries.forEach(element => {
      const delivery = {
         delivery_id: element.delivery_id,
         pickup_time: element.pickup_time,
         start_time: element.start_time,
         end_time: element.end_time,
         location: element.location,
         status: element.status,
         package_id: element.package_id
      }
      deliv.push(delivery)
   });
   return deliv;
}

const findDeliveryById = async (delivery_id) => {
   const delivery = await deliveryModel.findOne({delivery_id});
   return {
      delivery_id: delivery.delivery_id,
      pickup_time: delivery.pickup_time,
      start_time: delivery.start_time,
      end_time: delivery.end_time,
      location: delivery.location,
      status: delivery.status,
      package_id: delivery.package_id
   } 
}

const saveDelivery = async (delivery) => {
   const newDelivery = new deliveryModel(delivery)
   const deliveryCreate = await newDelivery.save()
   return {
      delivery_id: deliveryCreate.delivery_id,
      pickup_time: deliveryCreate.pickup_time,
      start_time: deliveryCreate.start_time,
      end_time: deliveryCreate.end_time,
      location: deliveryCreate.location,
      status: deliveryCreate.status,
      package_id: deliveryCreate.package_id
   } 
}

const updateDelivery = async (delivery_id, delivery) => {
   packageModel.findOneAndUpdate({delivery_id}, delivery, {new: true}, (error, newDelivery) => {
      if(error) {
         return null
      } else {
         findDeliveryById(delivery)
      }
   })
}

const deleteDelivery = async (delivery_id) => {
   packageModel.findOneAndDelete({delivery_id}, (error, delivery) => {
      if(error) {
         return null
      } else {
         return delivery
      }
   })
}

module.exports = {
   deleteDelivery,
   findDeliveries,
   findDeliveryById,
   saveDelivery,
   updateDelivery
}