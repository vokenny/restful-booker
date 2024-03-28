const { test, expect } = require('@playwright/test');

test.describe('GET /booking', () => {
  test.only('should return all the existing booking IDs', async ({
    request,
  }) => {
    const res = await request.get('/booking');
    expect(res.ok()).toBeTruthy();
    expect(await res.json()).toHaveLength(10);
  });
});
