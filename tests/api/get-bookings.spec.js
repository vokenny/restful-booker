const { test, expect } = require('@playwright/test');

const Booking = require('../../models/booking');
const { prepopulateBookings } = require('../utils/prepopulate');

test.describe('GET /booking', () => {
  test.beforeEach('Clearing and pre-populating the database', () => {
    Booking.deleteAll(() => console.log('Bookings cleared'));
    prepopulateBookings(5);
  });

  test('should return all the existing booking IDs', async ({ request }) => {
    const res = await request.get('/booking');
    expect(res.ok()).toBeTruthy();
    expect(await res.json()).toHaveLength(5);
  });
});
