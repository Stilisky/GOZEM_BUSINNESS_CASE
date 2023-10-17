const deliveryServices = require('./deliveryServices')
const packageServices = require('./packageServices')

exports.addDeliveryToPackage = async (package_id, delivery_id) => {
   const addpack = {
      active_delivery_id: delivery_id
   }
   await packageServices.updatePackage(package_id, addpack)
}