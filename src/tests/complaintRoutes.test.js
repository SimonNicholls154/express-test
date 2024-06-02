
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;

const complaintRoutes = require('../routes/complaintRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/complaints', complaintRoutes);

const token = process.env.ACCESS_TOKEN_SECRET;

describe('Complaints API', () => {
  let createdComplaintId;

  it('Should create a new complaint', async () => {
    const response = await request(app)
        .post('/api/v1/complaints')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Test Complaint',
          description: 'This is a test complaint',
          category: 'Service'
        });      
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('subject', 'Test Complaint');
      createdComplaintId = response.body.id;
  });

  it('Should get a list of complaints', async () => {
    const response = await request(app)
        .get('/api/v1/complaints')
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf.at.least(1);
  });

  it('should get a specific complaint by ID', async () => {
    const response = await request(app)
        .get(`/api/v1/complaints/${createdComplaintId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id', createdComplaintId);
    expect(response.body).to.have.property('subject', 'Test Complaint');
  });

  it('should update a complaint', async () => {
    const response = await request(app)
      .put(`/api/v1/complaints/${createdComplaintId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Resolved' })
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('status', 'Resolved');
  });

  it('should delete a complaint', async () => {
    const response = await request(app)
      .delete(`/api/v1/complaints/${createdComplaintId}`)
      .set('Authorization', 'Bearer ${token}')
    expect(response.status).to.equal(204);
  });

  it('should return 404 for a non-existant complaint', async () => {
    const response = await request(app)
      .get('/api/v1/complaints/999')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).to.equal(404);
  })
});
