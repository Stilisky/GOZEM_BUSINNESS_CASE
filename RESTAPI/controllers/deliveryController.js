const deliveryServices = require('../services/deliveryServices')

const getDeliveries = async(req, res) => {
   try {
      const deliveries = await deliveryServices.findDeliveries()
      res.status(200).json(deliveries)
   } catch (error) {
      res.status(500).json("Server Error")
   }
}

const getDeliveryById = async (req, res) => {
   try {
      const delivery = await deliveryServices.findDeliveryById(req.params.id)
      res.status(200).json(delivery)
   } catch (error) {
      res.status(400).json("This package id doesn't exist")
   }
}

const saveDelivery = async (req, res) => {
   try {
      const id = req.params.id;
      const delivery = {
         delivery_id: id,
         pickup_time: req.body.pickup_time,
         start_time: req.body.start_time,
         end_time: req.body.end_time,
         location: req.body.location,
         status: req.body.status,
         package_id: req.body.package_id
      } 
      const response = await deliveryServices.saveDelivery(delivery)
      res.status(201).json(response)
   } catch (error) {
      res.status(400).json(error)
   }
}

const updateDelivery = async (req,res) => {
   try {
      const id = req.params.id
      const delivery = await deliveryServices.updateDelivery(id, req.body)
      res.status(201).json(delivery)
   } catch (error) {
      res.status(400).json(error)
   }
}

const deleteDelivery = async (req, res) => {
   try {
      const delivery = await deliveryServices.deleteDelivery(req.params.id)
      res.status(200).json("Delivery successfuly delete")
   } catch (error) {
      res.status(400).json("This delivery id doesn't exist")
   }
}

module.exports = {
   deleteDelivery,
   getDeliveries,
   getDeliveryById,
   saveDelivery,
   updateDelivery
}