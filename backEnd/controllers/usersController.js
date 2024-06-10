'use strict';

const controller = {};
const models = require('../models');

controller.showUsersList = async (req, res) => {
    try {
        const recentUsers = await models.Customer.findAll({
            attributes: ['customerId', 'name', 'phoneNumber', 'homeAddress', 'currentLocation'],
            order: [['customerId', 'ASC']], // ASC, DESC
            limit: 10
        });
        res.json(recentUsers); //Tra ve file json
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

controller.addUser = async (req, res) => {
    const { customerId, name, phoneNumber, homeAddress, currentLocation, isDriver, driverId, workStatus } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!customerId || !name || !phoneNumber || !homeAddress || !currentLocation) {
        return res.status(400).send("All customer fields are required!");
    }

    if (isDriver) {
        if (!driverId || !workStatus) {
            return res.status(400).send("All driver fields are required!");
        }
    }

    try {
        // Customer
        await models.Customer.create({
            customerId,
            name,
            phoneNumber,
            homeAddress,
            currentLocation
        });

        // Nếu là Driver
        if (isDriver) {
            await models.Driver.create({
                driverId,
                name,
                phoneNumber,
                currentLocation,
                workStatus
            });
        }

        res.redirect('/usersList');
    } catch (error) {
        console.error(error);
        res.status(500).send("Cannot add user!");
    }
};

controller.deleteUser = async (req, res) => {
};

controller.editUser = async (req, res) => {
};


module.exports = controller;
