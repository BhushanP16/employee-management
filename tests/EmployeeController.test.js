const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Employee = require('../models/Employee');

beforeEach(async () => {
  await Employee.deleteMany({});
});

describe('Employee Controller Tests', () => {
  test('Should create new employee', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  test('Should get all employees', async () => {
    await Employee.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    const response = await request(app).get('/api/employees');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('Should update employee', async () => {
    const employee = await Employee.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    const response = await request(app)
      .put(`/api/employees/${employee._id}`)
      .send({
        name: 'Jane Doe'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
  });

  test('Should delete employee', async () => {
    const employee = await Employee.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    const response = await request(app)
      .delete(`/api/employees/${employee._id}`);
    
    expect(response.statusCode).toBe(200);
    
    const deletedEmployee = await Employee.findById(employee._id);
    expect(deletedEmployee).toBeNull();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});