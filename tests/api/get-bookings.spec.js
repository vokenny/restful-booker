const { test, expect } = require('@playwright/test');

test.describe('GET /booking', () => {
  test('should return all the existing booking IDs', async ({ request }) => {
    const res = await request.get('/booking');
    expect(res.ok()).toBeTruthy();

    const bookingIDs = await res.json();
    expect(bookingIDs).toHaveLength(10);
    bookingIDs.forEach((bookingID) => {
      expect(bookingID).toMatchObject({ bookingid: expect.any(Number) });
    });
  });
});
