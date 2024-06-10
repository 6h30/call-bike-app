'use strict';

const amqp = require('amqplib/callback_api');
const sequelize = require('sequelize');
const models = require('../models');

const processMessage = async (msg, ch) => {
  const transaction = await sequelize.transaction();
  try {
    const newRequest = JSON.parse(msg.content.toString());
    console.log(' [x] Received %s', msg.content.toString());

    // Tìm tài xế gần nhất đang sẵn sàng trong phạm vi transaction
    const availableDriver = await models.Driver.findOne({
      where: { status: 'available' },
      order: [
        [sequelize.fn('ST_Distance_Sphere', sequelize.literal('point(currentLocation)'), sequelize.literal(`point(${newRequest.pickupLocation})`)), 'ASC']
      ],
      transaction
    });

    if (availableDriver) {
      // Cập nhật trạng thái tài xế và yêu cầu trong phạm vi transaction
      await availableDriver.update({ status: 'busy' }, { transaction });

      await models.RideRequest.update(
        { driverId: availableDriver.driverId, status: 'accepted' },
        { where: { requestId: newRequest.requestId }, transaction }
      );

      console.log(`Assigned driver ${availableDriver.driverId} to request ${newRequest.requestId}`);
    } else {
      // Không có tài xế nào có sẵn, cập nhật trạng thái yêu cầu trong phạm vi transaction
      await models.RideRequest.update(
        { status: 'no_driver_available' },
        { where: { requestId: newRequest.requestId }, transaction }
      );

      console.log(`No available drivers for request ${newRequest.requestId}`);
    }

    await transaction.commit();
    // Xác nhận đã xử lý xong thông điệp
    ch.ack(msg);
  } catch (error) {
    await transaction.rollback();
    console.error('Error processing ride request:', error);
    ch.nack(msg); // Thông báo xử lý thất bại, có thể xử lý lại sau
  }
};

const startWorker = () => {
  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
      console.error('Failed to connect to RabbitMQ:', err);
      process.exit(1); // Thoát ứng dụng nếu không thể kết nối
    }

    conn.createChannel((err, ch) => {
      if (err) {
        console.error('Failed to create channel:', err);
        process.exit(1); // Thoát ứng dụng nếu không thể tạo kênh
      }

      const q = 'ride_requests';
      ch.assertQueue(q, { durable: true });

      // Thiết lập prefetch để xử lý nhiều thông điệp đồng thời
      ch.prefetch(10); // Số lượng thông điệp mà worker sẽ lấy một lúc

      ch.consume(q, (msg) => {
        if (msg !== null) {
          processMessage(msg, ch);
        }
      }, { noAck: false });
    });
  });
};

startWorker();

module.exports = startWorker;
