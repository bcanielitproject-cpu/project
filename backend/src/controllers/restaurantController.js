import Restaurant from "../models/Restaurant.js";

export async function getRestaurants(req, res, next) {
  try {
    const restaurants = await Restaurant.find()
      .populate("reviews.userId", "phone")
      .sort({ name: 1 });

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
}

export async function addRestaurantReview(req, res, next) {
  try {
    const { rating, comment } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.reviews.push({
      userId: req.user._id,
      rating,
      comment
    });

    await restaurant.save();
    await restaurant.populate("reviews.userId", "phone");

    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
}
