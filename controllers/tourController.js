const fs = require("fs");

// TOUR ROUTES
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      results: tours.length,
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
