const packageServices = require('../services/packageServices')

const getPackages = async(req, res) => {
   try {
      const packages = await packageServices.findPackages()
      res.status(200).json(packages)
   } catch (error) {
      res.status(500).json({error: "Server Error"})
   }
}

const getPackageById = async (req, res) => {
   try {
      const package = await packageServices.findPackageById(req.params.id)
      res.status(200).json(package)
   } catch (error) {
      res.status(400).json({error: "This package id doesn't exist"})
   }
}

const savePackage = async (req, res) => {
   try {
      const id = req.params.id;
      // console.log(id);
      const pack = {
         package_id: id,
         active_delivery_id: req.body.active_delivery_id,
         description: req.body.description,
         weight: req.body.weight,
         width: req.body.width,
         height: req.body.height,
         depth: req.body.depth,
         from_name: req.body.from_name,
         from_address: req.body.from_address,
         from_location: req.body.from_location,
         to_name: req.body.to_name,
         to_address: req.body.to_address,
         to_location: req.body.to_location
      }
      const package = await packageServices.createPackage(pack)
      res.status(201).json(package)
   } catch (error) {
      res.status(400).json(error)
   }
}

const updatePackage = async (req,res) => {
   try {
      const id = req.params.id
      const package = await packageServices.updatePackage(id, req.body)
      res.status(201).json(package)
   } catch (error) {
      res.status(400).json(error)
   }
}

const deletePackage = async (req, res) => {
   try {
      const pack = await packageServices.deletePackage(req.params.id)
      res.status(200).json({message: "Package successfuly delete"})
   } catch (error) {
      res.status(400).json({error : "This package id doesn't exist"})
   }
}

module.exports = {
   deletePackage,
   getPackageById,
   getPackages,
   updatePackage,
   savePackage
}