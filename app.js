const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      results: tours.length,
      tours,
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

app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
