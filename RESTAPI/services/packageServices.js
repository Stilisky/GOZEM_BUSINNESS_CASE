const packageModel = require('../models/Package')

const findPackages = async () => {
   const packages = await packageModel.find();
   const packs = []
   packages.forEach(element => {
      const package = {
         package_id: element.package_id,
         active_delivery_id: element.active_delivery_id,
         description: element.description,
         weight: element.weight,
         width: element.width,
         height: element.height,
         depth: element.depth,
         from_name: element.from_name,
         from_address: element.from_address,
         from_location: element.from_location,
         to_name: element.to_name,
         to_address: element.to_address,
         to_location: element.to_location
      }
      packs.push(package)
   });
   return packs;
}

const findPackageById = async (package_id) => {
   const package = await packageModel.findOne({package_id})
   return {
      package_id: package.package_id,
      active_delivery_id: package.active_delivery_id,
      description: package.description,
      weight: package.weight,
      width: package.width,
      height: package.height,
      depth: package.depth,
      from_name: package.from_name,
      from_address: package.from_address,
      from_location: package.from_location,
      to_name: package.to_name,
      to_address: package.to_address,
      to_location: package.to_location
   }
}

const createPackage = async (package) => {
   const newPackage = new packageModel(package)
   const savePackage = await newPackage.save()
   return {
      package_id: savePackage.package_id,
      active_delivery_id: savePackage.active_delivery_id,
      description: savePackage.description,
      weight: savePackage.weight,
      width: savePackage.width,
      height: savePackage.height,
      depth: savePackage.depth,
      from_name: savePackage.from_name,
      from_address: savePackage.from_address,
      from_location: savePackage.from_location,
      to_name: savePackage.to_name,
      to_address: savePackage.to_address,
      to_location: savePackage.to_location
   }
}

const updatePackage = async (package_id, package) => {
   const filter = {
      package_id: package_id
   }
   const upPackage = await packageModel.findOneAndUpdate(filter, package)
   return await findPackageById(package_id)
}

const deletePackage = async (package_id) => {
   const filter = {
      package_id: package_id
   }
   const deletePack = await packageModel.findOneAndDelete(filter)
   return deletePack
}

module.exports = {
   findPackageById,
   createPackage,
   findPackages,
   deletePackage,
   updatePackage
}