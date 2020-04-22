const { createHello } = require('../../src/createHello');

describe('createHello', () => {
  it('creates Hello World', () => {
    const result = createHello();
    expect(result).toBe('Hello World');
  });
});
