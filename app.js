const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET TOURS
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      results: tours.length,
      tours,
    },
  });
});

// GET A SINGLE TOUR
app.get("/api/v1/tours/:id", (req, res) => {
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
});

// ADD NEW TOUR
app.post("/api/v1/tours", (req, res) => {
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
});

// UPDATE TOUR
app.patch("/api/v1/tours/:id", (req, res) => {
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

  // // Update the tour with new data
  // Object.assign(tour, req.body);

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour...>",
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
