const Bus = require("../models/schemas/busSchema");
const Route = require("../models/schemas/routeSchema");

const getAllBuses = async (req, res, next) => {
  try {
    // Get all buses
    const buses = await Bus.find();
    return res.status(200).json(buses);
  } catch (error) {
    next(error);
  }
};

const getBusById = async (req, res, next) => {
  try {
    // Get bus by ID
    const busId = req.params.id;
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res.status(200).json(bus);
  } catch (error) {
    next(error);
  }
};

const addBus = async (req, res, next) => {
  try {
    let { busName, totalSeats, availableDays, arrival, departure } = req.body;
    availableDays = availableDays.map((day) => day.toLowerCase());
    // Create a new bus
    const newBus = new Bus({
      busName,
      totalSeats,
      availableDays,
      arrival,
      departure,
    });

    await newBus.save();

    return res
      .status(201)
      .json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    next(error);
  }
};

const updateBus = async (req, res, next) => {
  try {
    const busId = req.params.id;
    let { busName, totalSeats, availableDays, arrival, departure } = req.body;
    availableDays = availableDays.map((day) => day.toLowerCase());
    // Update bus by ID
    const updatedBus = await Bus.findByIdAndUpdate(
      busId,
      {
        busName,
        totalSeats,
        availableDays,
        arrival,
        departure,
      },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res
      .status(200)
      .json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    next(error);
  }
};

const deleteBus = async (req, res, next) => {
  try {
    const busId = req.params.id;

    // Delete bus by ID
    const deletedBus = await Bus.findByIdAndDelete(busId);

    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const searchBuses = async (req, res, next) => {
  try {
    const { source, destination, date } = req.query;
    const weekday = new Date(date)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    // Get all buses
    const buses = await Route.find({
      $and: [{ source: source }, { destination: destination }],
    }).populate("buses");
    
    if (buses.length === 0) {
      return res.status(404).json({ message: "No bus found!" });
    }

    let availableBuses = [];
    buses[0].buses.forEach((bus) => {
      if (bus.availableDays.includes(weekday)) {
        availableBuses.push(bus);
      }
    });

    const fromattedData = {
      source: buses[0].source,
      destination: buses[0].destination,
      eta: buses[0].eta,
      distance: buses[0].distance,
      availableBuses: availableBuses,
    };
    return res.status(200).json(fromattedData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBuses,
  getBusById,
  addBus,
  updateBus,
  deleteBus,
  searchBuses,
};

// TODO: Check if user if admin or not
