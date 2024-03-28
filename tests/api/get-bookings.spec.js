const { test, expect } = require('@playwright/test');
const Booking = require('../../models/booking');
const {
  generateBooking,
  prepopulateBookings,
} = require('../utils/prepopulate');

test.describe('GET /booking', () => {
  test.beforeEach('Clearing and pre-populating the database', () => {
    Booking.deleteAll(() => console.log('Bookings cleared'));
    prepopulateBookings(10);
  });

  test('should return all the existing booking IDs', async ({ request }) => {
    const res = await request.get('/booking');
    const bookingIDs = await res.json();

    expect(res.status()).toBe(200);
    expect(bookingIDs).toHaveLength(10);
    bookingIDs.forEach((bookingID) => {
      expect(bookingID).toMatchObject({ bookingid: expect.any(Number) });
    });
  });

  test('should return booking IDs based on the firstname filter', async ({
    request,
  }) => {
    const newBooking = generateBooking();
    const firstName = newBooking.firstname;

    const submittedBookingRes = await request.post('/booking', {
      data: newBooking,
    });
    expect(submittedBookingRes.status()).toBe(200);
    const newBookingID = (await submittedBookingRes.json()).bookingid;

    const res = await request.get('/booking', {
      params: {
        firstname: firstName,
      },
    });
    const bookingIDs = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(bookingIDs).toHaveLength(1);
    expect(bookingIDs[0]).toMatchObject({ bookingid: newBookingID });
  });
});
