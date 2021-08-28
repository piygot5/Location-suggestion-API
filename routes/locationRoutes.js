const express = require("express");

const { getlocations, getlocation } =  require('../controllers/locationController.js');

const router = express.Router();

router.get('/', getlocations);

module.exports = router;