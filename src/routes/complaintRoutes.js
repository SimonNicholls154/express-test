const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, complaintController.listComplaints);
router.post('/', authenticateToken, complaintController.createComplaint);
router.get('/:id', authenticateToken, complaintController.getComplaint);
router.put('/:id', authenticateToken, complaintController.updateComplaint);
router.delete('/:id', authenticateToken, complaintController.deleteComplaint);

module.exports = router;
