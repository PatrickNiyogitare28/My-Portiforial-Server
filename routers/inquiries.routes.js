const express = require('express');
const router = express.Router();
const {sendInquiry, getInquiries, getInquiryByStatus, getInquiryById, updateStatus} = 
require('../controllers/inquiries.controller');

router.post('/sendInquiry', sendInquiry);
router.get('/allInquiries', getInquiries);
router.get('/byStatus/:status', getInquiryByStatus);
router.get('/byInquiryId/:id', getInquiryById);
router.put('/updateStatus/inquiry/:id/status/:status', updateStatus)


module.exports = router;