const Employee = require('../models/Employee');

class EmployeeController {
  // Get all employees
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find({});
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create new employee
  static async createEmployee(req, res) {
    try {
      const employee = new Employee(req.body);
      const savedEmployee = await employee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update employee
  static async updateEmployee(req, res) {
    const { id } = req.params;
    try {
      const employee = await Employee.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete employee
  static async deleteEmployee(req, res) {
    const { id } = req.params;
    try {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EmployeeController;