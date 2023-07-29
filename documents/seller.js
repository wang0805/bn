// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = (datas) => {
  const today = new Date();
  let size = datas.qty * datas.contract_size * parseInt(datas.consMonth);

  // let size = 0;
  // if (datas.instrument === "S") {
  //   size = datas.qty * 500 * parseInt(datas.consMonth);
  // } else {
  //   size = datas.qty * 100 * parseInt(datas.consMonth);
  // }

  let strike = "N/A";
  if (datas.strike && datas.strike !== "NaN") {
    strike = `USD ${datas.strike}`;
  }

  let cal;
  if (datas.calculation === "&"){
    cal = "%"
  }
  else {
    cal = "USD"
  }

  let comms = `${datas.s_comms} ${cal} (${
    Math.round(datas.s_tcomm * 100) / 100
  } USD)`;
  if (datas.s_client_id === 13) {
    comms = "Standard as Agreed";
  }

  let deal_id = datas.deal_id;
  if (!datas.deal_id) {
    deal_id = "Subject to Clearing";
  }

  return `
              <!doctype html>
              <html>
                  <head>
                      <meta charset="utf-8">
                      <title>PDF Recap Template</title>
                      <style>
                          .box {
                              max-width: 500px;
                              margin: auto;
                              line-height: 20px;
                              font-size: 10px;
                              font-family: 'Helvetica Neue', 'Helvetica';
                          }
                          .box table {
                              width: 100%;
                              line-height: inherit;
                          }
                          .item {
  
                          }
                          .justify-left {
                              text-align: left;
                              font-size: 9px;
                              margin-top: 40px
                          }
                      </style>
                  </head>
                  <body>
                  <img style="position: absolute; top: -100px; left: 0px;" src="bpi.png"> 
                  <div style="text-align: center; font-size: 14px; margin-bottom: 20px; font-weight: bold;">Confirmation of Trade</div> 
                  <div class="box">
                      <table cellpadding="0" cellspacing="0">
                          <table cellpadding="0" cellspacing="0">
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Trade Id</td>
                                  <td style="width: 70%; text-align: left">BPI${datas.tradeid}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Client</td>
                                  <td style="width: 70% ;text-align: left">${datas.s_client}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Buy/Sell</td>
                                  <td style="width: 70% ;text-align: left">Sell</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Product</td>
                                  <td style="width: 70%; text-align: left">${datas.product_code}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Contract</td>
                                  <td style="width: 70%; text-align: left">${datas.contract}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Price</td>
                                  <td style="width: 70%; text-align: left">USD ${datas.price}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Strike (if applicable)</td>
                                  <td style="width: 70%; text-align: left">${strike}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Instrument</td>
                                  <td style="width: 70%; text-align: left">${datas.instrument}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Quantity(lots)</td>
                                  <td style="width: 70%; text-align: left">${datas.qty} lots/month</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Quantity</td>
                                  <td style="width: 70%; text-align: left">${size} ${datas.unit}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Trader</td>
                                  <td style="width: 70%; text-align: left">${datas.s_trader}</td>
                              </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Account</td>
                                  <td style="width: 70%; text-align: left">${datas.s_accounts}</td>
                              </tr>
                              <tr class="item">
                                <td style="width: 30%; text-align: left">Exchange Ref</td>
                                <td style="width: 70%; text-align: left">${deal_id}</td>
                            </tr>
                              <tr class="item">
                                  <td style="width: 30%; text-align: left">Commission</td>
                                  <td style="width: 70%; text-align: left">${comms}</td>
                              </tr>
                          </table>
                          <div class="justify-left">
                          This recap was issued on ${today}
                          <p></p>
                          Formal documentation to be supplied by your clearing member, trade subject to clearing. Many thanks for the trade
                          <p></p>
                          Please contact BPI Futures within 24hrs if you disagree with the contents of this message.
                          </div>
                      </div>
                  </body>
              </html>
                `;
};
