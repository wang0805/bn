const express = require("express");
const http = require("http");
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdf = require("html-pdf");

const pdfTemplate = require("./documents");

const Email = require("email-templates");
const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * ===================================
 * nodemailer set up
 * ===================================
 */
var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, //true for 465 and false for other ports, gmail SSL 465 / TLS 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: { rejectUnauthorized: false }
});

const email = new Email({
  message: {
    from: '"futuresops" <operations@bpifinancial.com>'
  },
  send: true,
  transport: transporter
});
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(guard.check("user"));

//import routes calling on db
require("./routes")(app, db);

app.post("/createpdf", (req, res) => {
  // console.log(req.body, "request body, for create pdf");
  let options = {
    orientation: "landscape",
    format: "A4",
    border: {
      top: "1.5cm", // default is 0, units: mm, cm, in, px
      right: "1cm",
      bottom: "0.5cm",
      left: "1cm"
    },
    paginationOffset: 1, // Override the initial pagination number
    header: {
      height: "30mm",
      contents: `
      <div style="text-align: center; font-size: 13px;">BRIGHT POINT INTERNATIONAL FUTURES(SG) PTE LTD</div>
      <div style="text-align: center; font-size: 10px;">3 Anson Road, #26-01 Springleaf Tower (S)079909 TEL: (65) 64990618</div>
      <div style="text-align: center; font-size: 10px;">GST Registration No: 201724830E</div>
      `
    },
    footer: {
      height: "15mm",
      contents: {
        first: "1",
        2: "2", // Any page number is working. 1-based index
        3: "3",
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last"
      }
    },
    base: "file:///Users/wenhao/Projects/bpi/backend/documents/" // to be able to read images
  };
  pdf.create(pdfTemplate(req.body), options).toFile("result.pdf", err => {
    if (err) {
      res.send(Promise.reject());
    }
    //to be used in client side
    res.send(Promise.resolve());
  });
});

app.get("/getpdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.post("/send", (req, res) => {
  // console.log(req.body, "req body from /send");
  // buyer
  let size = 0;
  if (req.body.instrument === "S") {
    size = req.body.qty * 500 * parseInt(req.body.consMonth);
  } else {
    size = req.body.qty * 100 * parseInt(req.body.consMonth);
  }

  let strike = "N/A";
  if (req.body.strike) {
    strike = `USD${req.body.strike}`;
  }

  email
    .send({
      template: "buyer",
      message: {
        to: req.body.b_recap
      },
      locals: {
        tradeid: req.body.tradeid,
        buyer: req.body.b_client,
        date: req.body.execDate,
        product_code: req.body.product_code,
        contract: req.body.contract,
        price: req.body.price,
        strike: strike,
        instrument: req.body.instrument,
        qty: req.body.qty,
        size: size,
        trader: req.body.b_trader,
        account: req.body.b_accounts,
        commission: req.body.b_comms
      }
    })
    .then(console.log("success for buyer"))
    .catch(console.error);
  // seller
  email
    .send({
      template: "seller",
      message: {
        to: req.body.s_recap
      },
      locals: {
        tradeid: req.body.tradeid,
        seller: req.body.s_client,
        date: req.body.execDate,
        product_code: req.body.product_code,
        contract: req.body.contract,
        price: req.body.price,
        strike: strike,
        instrument: req.body.instrument,
        qty: req.body.qty,
        size: size,
        trader: req.body.s_trader,
        account: req.body.s_accounts,
        commission: req.body.s_comms
      }
    })
    .then(console.log("success for seller"))
    .catch(console.error);
  res.send("success in sending mail");
});

// Root GET request (it doesn't belong in any controller file)
app.get("/", (req, res) => {
  res.json([{ TEST: "TESTING ROUTES" }]);
});

/**
 * ===================================
 * Listen to requests on port 3001
 * ===================================
 */
const PORT = process.env.PORT || 3001;

const server = http.Server(app);

server.listen(PORT, () =>
  console.log("~~~ Tuning in to the waves of port " + PORT + " ~~~")
);

// Run clean up actions when server shuts down
server.on("close", () => {
  console.log("Closed express server");

  db.pool.end(() => {
    console.log("Shut down db connection pool");
  });
});
