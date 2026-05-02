import TaxiBooking from "../models/TaxiBooking.js";

export async function bookTaxi(req, res, next) {
  try {
    const { bookingChoice, pickup, drop, date, time, phone } = req.body;

    const booking = await TaxiBooking.create({
      userId: req.user._id,
      bookingChoice,
      pickup,
      drop,
      date,
      time,
      phone,
      paymentMethod: "COD"
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
}

export async function getMyTaxiBookings(req, res, next) {
  try {
    const bookings = await TaxiBooking.find({ userId: req.user._id }).sort({
      createdAt: -1
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
}

export async function cancelTaxiBooking(req, res, next) {
  try {
    const booking = await TaxiBooking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: "Taxi booking not found" });
    }

    res.json({ message: "Taxi booking cancelled" });
  } catch (error) {
    next(error);
  }
}
