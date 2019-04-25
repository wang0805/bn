const sha256 = require("js-sha256");
let jwt = require("jsonwebtoken");
let config = require("../config");

module.exports = db => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const index = (request, response) => {
    db.users.index((error, result) => {
      if (error) {
        console.error("error in getting back user index", error);
        request.sendStatus(500);
      } else {
        // console.log('user index result rows: ', result.rows);
        var resultrows = result.rows;
        response.json(resultrows);
      }
    });
  };

  const create = (request, response) => {
    db.users.create(request.body, (error, queryResult) => {
      if (error) {
        console.error("error getting user:", error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log("User created successfully");
      } else {
        console.log("User could not be created");
      }

      // redirect to home page after creation
      response.send("created");
    });
  };

  const login = (req, res) => {
    db.users.login(req.body, (error, result) => {
      // console.log('result controller for login: ', result.rows);
      if (error) {
        console.error("Query error", error);
      } else if (result.rows[0] != undefined) {
        if (sha256(req.body.password) === result.rows[0].password) {
          let token = jwt.sign(
            {
              username: req.body.name,
              permissions: result.rows[0].permissions
            },
            config.secret,
            {
              expiresIn: "24h" // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
            user_id: result.rows[0].id
          });
        } else {
          res.json({
            success: false,
            message: "Incorrect username or password"
          });
        }
      } else {
        res.json({
          success: false,
          message: "Authentication failed, no such user"
        });
      }
    });
  };

  const logout = (req, res) => {
    //fill in
    res.send("clear");
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    create,
    login,
    logout,
    index
  };
};
