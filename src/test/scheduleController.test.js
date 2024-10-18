import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import Schedule from '../Models/ScheduleModel.js';

// Sample schedule data for testing
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
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
      expect(res.status).toBe(201); // Expect to get a 201 status code
      expect(res.body).toHaveProperty('_id'); // Expect the response to contain an ID
      expect(res.body.fname).toBe(sampleSchedule.fname); // Expect the first name to match
    });

    it('should return 400 status if required fields are missing', async () => {
      const res = await request(app).post('/schedule/create').send({});
      expect(res.status).toBe(400); // Expect to get a 400 status code for bad request
      expect(res.body).toHaveProperty('error'); // Expect an error message in response
    });
  });

  // Read Schedule Tests
  describe('GET /view', () => {
    it('should return all schedules and return 200 status', async () => {
      await Schedule.create(sampleSchedule); // Create a sample schedule for testing
      const res = await request(app).get('/schedule/view');
      expect(res.status).toBe(200); // Expect to get a 200 status code
      expect(res.body.length).toBe(1); // Expect to get 1 schedule in response
      expect(res.body[0].fname).toBe(sampleSchedule.fname); // Expect the first name to match
    });

    it('should return 404 status if no schedules are found', async () => {
      const res = await request(app).get('/schedule/view');
      expect(res.status).toBe(200); // Expect to get a 200 status code even if no schedules are found
      expect(res.body.length).toBe(0); // Expect an empty array
    });
  });

  describe('GET /doc/:id', () => {
    it('should return a schedule by ID and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); // Create a sample schedule
      const res = await request(app).get(`/schedule/doc/${schedule._id}`);
      expect(res.status).toBe(200); // Expect to get a 200 status code
      expect(res.body.fname).toBe(sampleSchedule.fname); // Expect the first name to match
    });

    it('should return 404 status if schedule ID is not found', async () => {
      const res = await request(app).get('/schedule/doc/60d5ec49d0e54c1a9c48c5a0'); // Non-existing ID
      expect(res.status).toBe(404); // Expect to get a 404 status code
      expect(res.body.message).toBe('No schedules found for this id.'); // Expect the proper error message
    });
  });

  // Update Schedule Tests
  describe('PUT /:id', () => {
    it('should update a schedule and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); // Create a sample schedule
      const updatedData = { fname: 'Nimal' }; // New data for update
      const res = await request(app).put(`/schedule/${schedule._id}`).send(updatedData);
      expect(res.status).toBe(200); // Expect to get a 200 status code
      expect(res.body.fname).toBe('Nimal'); // Expect the first name to be updated
    });

    it('should return 404 status if trying to update a non-existing schedule', async () => {
      const res = await request(app).put('/schedule/60d5ec49d0e54c1a9c48c5a0').send({ fname: 'Sunimal' });
      expect(res.status).toBe(404); // Expect to get a 404 status code
      expect(res.body.message).toBe('Schedule not found.'); // Expect the proper error message
    });
  });

  // Delete Schedule Tests
  describe('DELETE /:id', () => {
    it('should delete a schedule and return 200 status', async () => {
      const schedule = await Schedule.create(sampleSchedule); // Create a sample schedule
      const res = await request(app).delete(`/schedule/${schedule._id}`);
      expect(res.status).toBe(200); // Expect to get a 200 status code
      expect(res.body.message).toBe('Schedule deleted successfully.'); // Expect the proper success message
    });

    it('should return 404 status if trying to delete a non-existing schedule', async () => {
      const res = await request(app).delete('/schedule/60d5ec49d0e54c1a9c48c5a0');
      expect(res.status).toBe(404); // Expect to get a 404 status code
      expect(res.body.message).toBe('Schedule not found.'); // Expect the proper error message
    });
  });
});
