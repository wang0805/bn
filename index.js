const express = require("express");
const http = require("http");
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdf = require("html-pdf");

const pdfTemplateHk = require("./documents/hk.js");
const pdfTemplateSg = require("./documents/sg.js");

const Email = require("email-templates");
const nodemailer = require("nodemailer");
const previewEmail = require("preview-email");
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

app.post("/sendpdf", (req, res) => {
  // console.log(req.body);
  let mailOptions = {
    from: "operations@bpifinancial.com",
    to: req.body.invoice_emails,
    subject: `${req.body.client} ${req.body.toM}${req.body.year} Invoice ${
      req.body.invoiceNo
    }`,
    html: `
    <p>Dear ${req.body.client},</p>
    <br/>
    <p>Please find the invoice for the previous month trades</p>
    <br/>
    <p>Best Regards,</p>
    <p>BPI Operations</p>
    <p>Email: operations@bpifinancial.com</p>
    `,
    attachments: [
      {
        filename: `invoice_${req.body.invoiceNo}.pdf`,
        path: __dirname + "/result.pdf",
        contentType: "application/pdf"
      }
    ]
  };
  //preview in my window
  previewEmail(mailOptions)
    .then(console.log("showing preview"))
    .catch(console.error);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send("Successfull in sending email");
  });
});

//create pdf and send a promise to the client side
{
  /* <img style="width: 90px; position: absolute; top: 0px; left: 120px;" src="file:///C:/Users/test/bpibackoffice/backend/documents/bpi.png> */
}
app.post("/createpdf", (req, res) => {
  let options = {
    orientation: "protrait",
    format: "A4",
    border: {
      top: "1.5cm",
      right: "1cm",
      bottom: "0.5cm",
      left: "1cm"
    },
    paginationOffset: 1,
    header: {
      height: "30mm",
      contents: `
      <div style="text-align: center; font-size: 13px;">BRIGHT POINT INTERNATIONAL FUTURES (SG) PTE LTD</div>
      <img style="width: 90px; position: absolute; top: 0px; left: 30px;" src="file:///C:/Users/test/bpibackoffice/backend/documents/bpi.png">
      <div style="text-align: center; font-size: 10px;">3 Anson Road, #26-01 Springleaf Tower (S) 079909 TEL: (65) 64990618</div>
      <div style="text-align: center; font-size: 10px;">GST Registration No: 201724830E</div>
      `
    },
    footer: {
      height: "15mm",
      contents: {
        first: "<div style='font-size: 12px;'>1</div>",
        2: "<div style='font-size: 12px;'>2</div>",
        3: "<div style='font-size: 12px;'>3</div>",
        4: "<div style='font-size: 12px;'>4</div>",
        last: "<div style='font-size: 12px;'>Last</div>"
      }
    },
    base: "file:///C:/Users/test/bpibackoffice/backend/documents/" // to be able to read images
  };
  let optionsHK = {
    orientation: "protrait",
    format: "A4",
    border: {
      top: "1.5cm",
      right: "1cm",
      bottom: "0.5cm",
      left: "1cm"
    },
    paginationOffset: 1,
    header: {
      height: "30mm",
      contents: `
      <div style="text-align: center; font-size: 13px;">BRIGHT POINT INTERNATIONAL FUTURES LIMITED</div>
      <img style="width: 90px; position: absolute; top: 0px; left: 30px;" src="file:///C:/Users/test/bpibackoffice/backend/documents/bpi.png">
      <div style="text-align: center; font-size: 9px;">Units 3401-03, 34/F, China Merchants Tower, Shun Tak Centre, 168-200 Connaught Road Central, Sheung Wan, Hong Kong</div>
      `
    },
    footer: {
      height: "15mm",
      contents: {
        first: "<div style='font-size: 12px;'>1</div>",
        2: "<div style='font-size: 12px;'>2</div>",
        3: "<div style='font-size: 12px;'>3</div>",
        4: "<div style='font-size: 12px;'>4</div>",
        last: "<div style='font-size: 12px;'>Last</div>"
      }
    },
    base: "file:///C:/Users/test/bpibackoffice/backend/documents/" // to be able to read images
  };
  if (req.body.client[0].entity === "SG") {
    pdf.create(pdfTemplateSg(req.body), options).toFile("result.pdf", err => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve()); //,then in client side
    });
  } else if (req.body.client[0].entity === "HK") {
    pdf.create(pdfTemplateHk(req.body), optionsHK).toFile("result.pdf", err => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  } else {
    res.send(Promise.reject());
  }
});

// after receiving the promise, .then from promise and get the pdf file
app.get("/getpdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.post("/send", (req, res) => {
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
        commission: req.body.b_comms,
        id: req.body.b_client_id
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
        commission: req.body.s_comms,
        id: req.body.s_client_id
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
