const deliveryServices = require('../services/deliveryServices')
const packageServices = require('../services/packageServices')

exports.webSocketLocationChange = async(data) =>{
   const id = data.delivery_id
   const loc = data.location
   // console.log(loc);
   const upDev = {
      location: loc
   }
   await deliveryServices.updateDelivery(id, upDev)
}

exports.webSocketGetDelivery = async(data) => {
   const id = data.delivery_id
   const delivery = await deliveryServices.findDeliveryById(id)
   const package = await packageServices.findPackageById(delivery.package_id);
   delivery.package_id = package;
   return delivery;
}

exports.webSocketDeliveryUpdateBroadcast = (clients, newdelivery)=> {
   clients.forEach(socket => {
      socket.emit('delivery_update', newdelivery)
   });
}

exports.webSocketStatusChange = async(data) => {
   const id = data.delivery_id;
   const stat = data.status;
   let updeliv = {}
   if(stat === "picked-up"){
      updeliv = {
         status: 'picked-up',
         pickup_time: Date.now()
      }
   } else if (stat === "in-transit"){
      updeliv = {
         status: 'in-transit',
         start_time: Date.now()
      }
   } else if(stat === "delivered" || stat === "failed"){
      updeliv = {
         status: stat,
         end_time: Date.now()
      }
   }
   await deliveryServices.updateDelivery(id, updeliv)
}
