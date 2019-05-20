// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = data => {
  const today = new Date();
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
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
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
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() +
                                 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Customer name: ${data[0].client}
                            </td>
                            <td>
                               Receipt number: "TBC"
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
               ${data.map(
                 (row, index) => `(
                 <tr key=${index} class="item">
                   <td>${row.id}</td>
                   <td>${row.trade_date}</td>
                   <td>${row.product}</td>
                   <td>${row.instrument}</td>
                   <td>${row.contract}</td>
                   <td>${row.price}</td>
                   <td>${row.size}</td>
                   <td>${row.comms}</td>
                   <td>${row.tcomms}</td>
                 </tr>
               )`
               )}
             </table>
             <br />
             <h1 class="justify-center">Total price: TBC$</h1>
          </div>
       </body>
    </html>
    `;
};
