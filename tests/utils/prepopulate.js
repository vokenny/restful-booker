const { isInteger } = require('validate.js');
import { faker } from '@faker-js/faker';

const Booking = require('../../models/booking');

function toIsoStringDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(date, numOfDays) {
  const futureDate = new Date(date);
  futureDate.setDate(futureDate.getDate() + numOfDays);
  return futureDate;
}

function generateBooking() {
  const checkInDate = new Date(faker.date.future());
  const checkOutDate = addDays(checkInDate, 10);

  const newBooking = {
    firstame: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.finance.amount(),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: toIsoStringDate(checkInDate),
      checkout: toIsoStringDate(checkOutDate),
    },
  };

  return newBooking;
}

function createBooking(bookingDetails) {
  Booking.create(bookingDetails, (err, res) => {
    if (err) {
      console.error('[createBooking] Error:', err);
      return;
    }

    console.log('[createBooking] Added booking:', res);
  });
}

function prepopulateBookings(numOfBookings) {
  if (!isInteger(numOfBookings) || numOfBookings < 1)
    throw new Error(
      '[prepopulateBookings] The number of bookings to pre-populate needs to be known.'
    );

  const newBookingsDetails = [...new Array(numOfBookings)].map(generateBooking);
  newBookingsDetails.forEach(createBooking);
}

module.exports = { prepopulateBookings };
