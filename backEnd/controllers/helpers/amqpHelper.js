const amqp = require('amqplib/callback_api');

const sendMessageToQueue = async (message) => {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://localhost', (err, conn) => {
      if (err) {
        console.error(err);
        return reject('Could not connect to RabbitMQ');
      }
      conn.createChannel((err, ch) => {
        if (err) {
          console.error(err);
          return reject('Could not create channel');
        }
        const q = 'ride_requests';
        ch.assertQueue(q, { durable: true });
        ch.sendToQueue(q, Buffer.from(JSON.stringify(message)));
        console.log(' [x] Sent %s', JSON.stringify(message));
        setTimeout(() => {
          conn.close();
          resolve();
        }, 500);
      });
    });
  });
};

module.exports = sendMessageToQueue;
