import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import Schedule from '../Models/ScheduleModel.js';


const sampleSchedule = {
  fname: "kamal",
  lname: "dahanayake",
  mobile: "0112236569",
  email: "Kamal@gmail.com",
  cdate: "1999-10-01",
  area: "Kandy",
  timeslot: "10:00 AM - 11:00 AM",
  jobstatus: false,
  type: "E-waste",
  description: "Elctronic waste",
  userid: "u12345",
};

describe('Schedule Controller', () => {
  // Connect to the test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });

  // Clear the database after each test
  afterEach(async () => {
    await Schedule.deleteMany({});
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Create Schedule Tests
  describe('POST /create', () => {
    it('should create a new schedule and return 201 status', async () => {
      const res = await request(app).post('/schedule/create').send(sampleSchedule);
      expect(res.status).toBe(201); 
      expect(res.body).toHaveProperty('_id'); 
      expect(res.body.fname).toBe(sampleSchedule.fname); 
    });

    it('should return 400 status if required fields are missing', async () => {
      const res = await request(app).post('/schedule/create').send({});
      expect(res.status).toBe(400); 
      expect(res.body).toHaveProperty('error'); 
    });
  });

  // Read Schedule Tests
  describe('GET /view', () => {
    it('should return all schedules and return 200 status', async () => {
      await Schedule.create(sampleSchedule); 
      const res = await request(app).get('/schedule/view');
      expect(res.status).toBe(200); 
      expect(res.body.length).toBe(1); 
      expect(res.body[0].fname).toBe(sampleSchedule.fname); 
    });

    it('should return 404 status if no schedules are found', async () => {
      const res = await request(app).get('/schedule/view');
      expect(res.status).toBe(200); 
      expect(res.body.length).toBe(0); 
    });
  });

  describe('GET /doc/:id', () => {
    it('should return a schedule by ID and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); 
      const res = await request(app).get(`/schedule/doc/${schedule._id}`);
      expect(res.status).toBe(200); 
      expect(res.body.fname).toBe(sampleSchedule.fname); 
    });

    it('should return 404 status if schedule ID is not found', async () => {
      const res = await request(app).get('/schedule/doc/60d5ec49d0e54c1a9c48c5a0'); 
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('No schedules found for this id.'); 
    });
  });

  // Update Schedule Tests
  describe('PUT /:id', () => {
    it('should update a schedule and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); 
      const updatedData = { fname: 'Nimal' }; 
      const res = await request(app).put(`/schedule/${schedule._id}`).send(updatedData);
      expect(res.status).toBe(200); 
      expect(res.body.fname).toBe('Nimal'); 
    });

    it('should return 404 status if trying to update a non-existing schedule', async () => {
      const res = await request(app).put('/schedule/60d5ec49d0e54c1a9c48c5a0').send({ fname: 'Sunimal' });
      expect(res.status).toBe(404); 
      expect(res.body.message).toBe('Schedule not found.'); 
    });
  });

  // Delete Schedule Tests
  describe('DELETE /:id', () => {
    it('should delete a schedule and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); 
      const res = await request(app).delete(`/schedule/${schedule._id}`);
      expect(res.status).toBe(200); 
      expect(res.body.message).toBe('Schedule deleted successfully.'); 
    });

    it('should return 404 status if trying to delete a non-existing schedule', async () => {
      const res = await request(app).delete('/schedule/60d5ec49d0e54c1a9c48c5a0');
      expect(res.status).toBe(404); 
      expect(res.body.message).toBe('Schedule not found.'); 
    });
  });
});
