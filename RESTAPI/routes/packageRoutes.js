var express = require('express');
var router = express.Router();
const {
   deletePackage,
   getPackageById,
   getPackages,
   savePackage,
   updatePackage
} = require('../controllers/packageController')

router.route('/').get(getPackages)
router.route('/:id').get(getPackageById).post(savePackage).put(updatePackage).delete(deletePackage)

module.exports = router