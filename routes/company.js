const Company = require("../models/Company");

module.exports = (server) => {
  server.get("/companies", async (req, res) => {
    try {
      const companies = await Company.find({});
      res.send(companies);
    } catch (err) {
      console.log(err);
    }
  });

  // get one Company

  server.get("/companies/:id", async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      res.send(company);
    } catch (err) {
      console.log(`There is no Company with the id of ${req.params.id}`);
    }
  });

  //Add Company

  server.post("/companies", async (req, res) => {
    if (!req.is("application/json")) {
      console.log("Expect 'application/json'");
    } else {
      const { name, description, number, email, logoUrl, state, city } =
        req.body;
      const company = new Company({
        name,
        description,
        number,
        email,
        logoUrl,
        state,
        city,
      });
      try {
        const newCompany = await company.save();
        res.sendStatus(201);
      } catch (err) {
        console.log("Error is ", err.message);
      }
    }
  });

  // Update Company

  server.put("/companies/:id", async (req, res) => {
    if (!req.is("application/json")) {
      console.log("Expect 'application/json'");
    } else {
      try {
        const company = await Company.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.sendStatus(200);
      } catch (err) {
        console.log(`There is no Company with the id of ${req.params.id}`);
      }
    }
  });

  // Delete Company

  server.delete("/companies/:id", async (req, res) => {
    try {
      const company = await Company.findOneAndRemove({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      console.log(`There is no Company with the id of ${req.params.id}`);
    }
  });
};
