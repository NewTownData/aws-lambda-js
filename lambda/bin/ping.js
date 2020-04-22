const { createHello } = require('../src/createHello');

exports.handler = async function () {
  console.log(`Function invoked`);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      message: createHello(),
    }),
  };
};
