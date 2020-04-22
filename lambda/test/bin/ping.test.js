const { handler } = require('../../bin/ping');
const { createHello } = require('../../src/createHello');

jest.mock('../../src/createHello');

describe('ping', () => {
  beforeEach(() => {
    createHello.mockReturnValue('Test');
  });

  it('creates response', async () => {
    const result = await handler();
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        message: 'Test',
      }),
    });
    expect(createHello).toHaveBeenCalled();
  });
});
