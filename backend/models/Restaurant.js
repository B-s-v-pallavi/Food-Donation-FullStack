import mongoose from "mongoose"

// Define a sub-schema for food items
const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); // _id disabled if you don't need separate ids for each food item

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  // Adding available food items
  availableFoodItems: [FoodItemSchema]
}, { timestamps: true });
const Restaurant =  mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;