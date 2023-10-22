const deliveryServices = require('./deliveryServices')
const packageServices = require('./packageServices')

exports.addDeliveryToPackage = async (package_id, delivery_id) => {
   const addpack = {
      active_delivery_id: delivery_id
   }
   await packageServices.updatePackage(package_id, addpack)
}

exports.webSocketLocationChange = async(delivery_id, location) =>{
   const upDev = {
      location: location
   }
   await deliveryServices.updateDelivery(delivery_id, upDev)
}

exports.webSocketGetDelivery = async(delivery_id) => {
   const delivery = await deliveryServices.findDeliveryById(delivery_id)
   const package = await packageServices.findPackageById(delivery.package_id);
   delivery.package_id = package;
   return delivery;
}

exports.webSocketDeliveryUpdateBroadcast = (clients, newdelivery)=> {
   clients.forEach(socket => {
      socket.emit('delivery_update', newdelivery)
   });
}