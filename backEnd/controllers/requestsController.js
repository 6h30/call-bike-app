'use strict';

const models = require('../models');
const sendMessageToQueue = require('./helpers/amqpHelper');

const requestController = {};

requestController.createRequest = async (req, res) => {
  const { customerId, pickupLocation, dropoffLocation } = req.body;

  try {
    const newRequest = await models.RideRequest.create({
      customerId,
      requestTime: new Date(),
      pickupLocation,
      dropoffLocation,
      status: 'pending',
    });
    // Gửi thông điệp đến hàng đợi RabbitMQ
    await sendMessageToQueue(newRequest);

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = requestController;
