const complaints = [
  {
    id: "1",
    subject: "Broken login form",
    description: "User cannot login to system since it won't accept their DoB",
    category: "service",
    status: "Open",
  }
];

module.exports = {
  getComplaints: () => complaints,
  getComplaintById: (id) => complaints.find(c => c.id == id),
  createComplaint: (complaint) => {
    complaint.id = complaints.length + 1;
    complaints.push(complaint);
    return complaint;
  },
  updateComplaint: (id, updatedData) => {
    const complaint = complaints.find(c => c.id == id);
    if (!complaint) return null;

    Object.assign(complaint, updatedData);
    return complaint;
  },
  deleteComplaint: (id) => {
    const index = complaints.findIndex(c => c.id == id);
    if (index === -1) return false;

    complaints.splice(index, 1);
    return true;
  }
};
