const express = require("express");

const route = express.Router();

const ManagerController = require("../controllers/ManagerController");

const ManagerModel = require("../models/ManagerModel");

const EmployeeModel = require("../models/EmployeeModel");

const managerAuth = require('../config/managerAuth');
console.log("Manager Routes Loaded");

route.post("/managerRegister", ManagerModel.uploadManagerImages, ManagerController.managerRegister);

route.post("/managerLogin", ManagerController.managerLogin);

route.get("/managerProfile",managerAuth, ManagerController.managerProfile);

route.post("/changePassword",managerAuth,ManagerController.changePassword);

route.get("/showAllManagers", managerAuth,ManagerController .showAllManagers)

route.delete("/deleteManager/:id", managerAuth, ManagerController .deleteManager)

// route.post("/employeeRegister",managerAuth.EmployeeModel.uploadManagerImages,ManagerController.employeeRegister);
route.post(
    "/employeeRegister",
    EmployeeModel.uploadManagerImages,
    managerAuth,
    ManagerController.employeeRegister
);


module.exports = route;