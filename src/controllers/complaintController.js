const complaintModel = require('../models/complaintModel');

module.exports = {
  listComplaints: (_req, res) => {
    const complaints = complaintModel.getComplaints();
    res.json(complaints);
  },
  getComplaint: (req, res) => {
    const complaint = complaintModel.getComplaintById(req.params.id);
    if (!complaint) return res.sendStatus(404);
    res.json(complaint);
  },
  createComplaint: (req, res) => {
    const { subject, description, category } = req.body;
    const complaint = {
      subject,
      description,
      category,
      status: 'Open',
    };
    const createdComplaint = complaintModel.createComplaint(complaint);
    res.status(201).json(createdComplaint);
  },
  updateComplaint: (req, res) => {
    const updatedComplaint = complaintModel.updateComplaint(req.params.id, req.body);
    if (!updatedComplaint) return res.sendStatus(404);
    res.json(updatedComplaint);
  },
  deleteComplaint: (req, res) => {
    const success = complaintModel.deleteComplaint(req.params.id);
    if (!success) return res.sendStatus(404);
    res.sendStatus(204);
  }
};
