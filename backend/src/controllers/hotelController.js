import Hotel from "../models/Hotel.js";
import HotelBooking from "../models/HotelBooking.js";

export async function getHotels(req, res, next) {
  try {
    const hotels = await Hotel.find().sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    next(error);
  }
}

export async function bookHotel(req, res, next) {
  try {
    const { hotelId, bookingChoice, checkIn, checkOut } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Selected hotel or homestay was not found" });
    }

    const booking = await HotelBooking.create({
      userId: req.user._id,
      hotelId,
      bookingChoice,
      checkIn,
      checkOut,
      paymentMethod: "COD"
    });

    const populated = await booking.populate("hotelId", "name type location pricePerNight");
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
}

export async function getMyHotelBookings(req, res, next) {
  try {
    const bookings = await HotelBooking.find({ userId: req.user._id })
      .populate("hotelId", "name type location pricePerNight")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
}

export async function cancelHotelBooking(req, res, next) {
  try {
    const booking = await HotelBooking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: "Hotel or homestay booking not found" });
    }

    res.json({ message: "Hotel or homestay booking cancelled" });
  } catch (error) {
    next(error);
  }
}
