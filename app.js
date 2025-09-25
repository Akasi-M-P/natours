// CORE MODULES
const fs = require("fs");
const express = require("express");
const { create } = require("domain");
const morgan = require("morgan");

const app = express();
const port = 3000;

// REGULAR MODULES
app.use(morgan("dev"));
app.use(express.json());

// TOURS ROUTE HANDLERS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      results: tours.length,
      tours,
    },
  });
};

const getTour = (req, res) => {
  // Get Param ID and convert it to a number
  const id = req.params.id * 1;

  // Find tour using the ID
  const tour = tours.find((el) => el.id === id);

  // Handle error when ID is INVALID
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "Invallid ID",
    });
  }

  // SEND TOUR TO CLIENT
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // CREATE A NEW TOUR ID
  const newId = tours[tours.length - 1].id + 1;
  // ASSIGN NEW ID TO NEW TOUR
  const newTour = Object.assign({ id: newId }, req.body);

  // ADD NEW TOUR TO TOURS ARRAY
  tours.push(newTour);

  console.log(newTour);

  // WRITE NEW TOUR TO TOURS ARRAY
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // Get Param ID and convert it to a number
  const id = req.params.id * 1;

  // Find tour using the ID
  const tour = tours.find((el) => el.id === id);

  // Handle ERROR when ID is INVALID
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour...>",
    },
  });
};

const deleteTour = (req, res) => {
  // Get Param ID and convert it to a number
  const id = req.params.id * 1;

  // Find tour using the ID
  const tour = tours.find((el) => el.id === id);

  // Handle ERROR when ID is INVALID
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// USERS ROUTE HANDLERS

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Server not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Server not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Server not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Server not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Server not yet defined",
  });
};

/*
// GET TOURS
app.get("/api/v1/tours", getAllTours);

// GET A SINGLE TOUR
app.get("/api/v1/tours/:id", getTour);

// ADD NEW TOUR
app.post("/api/v1/tours", createTour);

// UPDATE TOUR
app.patch("/api/v1/tours/:id", updateTour);

// DELETE TOUR
app.delete("/api/v1/tours/:id", deleteTour);
*/

// TOUR ROUTES
// TOUR ROUTER CREATED TO USE EXPRESS ROUTER
const tourRoute = express.Router();

tourRoute.route("/").get(getAllTours).post(createTour);

tourRoute.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

// TOUR ROUTER
app.use("/api/v1/tours", tourRoute);

// USER ROUTES
// USER ROUTE CREATED TO USE EXPRESS ROUTER
const userRoute = express.Router();

userRoute.route("/").get(getAllUsers).post(createUser);

userRoute.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// USER ROUTER USED
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
