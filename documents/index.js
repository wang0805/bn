// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = data => {
  const today = new Date();
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].tcomms;
  }
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 0 30px;
             font-size: 8px;
             line-height: 21px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
             }
             .justify-center {
             text-align: right;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: center;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
             <table cellpadding="0" cellspacing="0">
                <tr class="information">
                   <td colspan="9">
                      <table>
                         <tr>
                            <td style="text-align: left;">
                               Customer name: ${data[0].client}
                            </td>
                            <td style="text-align: left;">
                               Receipt number: id
                            </td>
                         </tr>
                         <tr>
                         <td style="text-align: left;">
                           Address: ${data[0].address}
                         </td>
                         <td style="text-align: left;">
                            Date: ${`${today.getDate()}/${today.getMonth() +
                              1}/${today.getFullYear()}`}
                         </td>
                      </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                  <td>Trade Id</td>
                  <td>Trade date</td>
                  <td>Product</td>
                  <td>Instrument</td>
                  <td>Contract</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Comms Rate</td>
                  <td>Total Comms</td>
               </tr>
                  ${data
                    .map(
                      row => `
                  <tr class="item">
                     <td>${row.id}</td>
                     <td>${row.trade_date}</td>
                     <td>${row.product}</td>
                     <td>${row.instrument}</td>
                     <td>${row.contract}</td>
                     <td>USD ${row.price}</td>
                     <td>${row.size} MT</td>
                     <td>USD ${row.comms}</td>
                     <td>USD ${row.tcomms}</td>
                  </tr>
                  `
                    )
                    .join(" ")}
             </table>
             <br />
             <h1 class="justify-center">Total Commission: USD ${total}</h1>
          </div>
       </body>
    </html>
    `;
};
