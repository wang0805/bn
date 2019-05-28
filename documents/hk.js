// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = datas => {
  const today = new Date();
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + datas.client[0].duedate);

  let total = 0;
  for (let i = 0; i < datas.client.length; i++) {
    total += datas.client[i].tcomms;
  }
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            .bankdets {
               line-height: 12px;
               margin: 0px 0px;
               padding: 0px 0px;
            }
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 0 30px;
             font-size: 8px;
             line-height: 18px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
             }
             .justify-left {
             text-align: left;
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
       <img style="position: absolute; top: -100px; left: 0px;" src="bpi.png"> 
       <body>
          <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
             <table cellpadding="0" cellspacing="0">
                <tr class="information">
                   <td colspan="10">
                      <table>
                         <tr>
                            <td style="text-align: left;">
                              <strong style="font-size: 12px;">${
                                datas.client[0].client
                              }</strong>
                            </td>
                            <td style="text-align: left;">
                               Invoice No: ${datas.invoiceNo}
                            </td>
                         </tr>
                         <tr>
                         <td style="text-align: left;">
                           Address: ${datas.client[0].address}
                         </td>
                         <td style="text-align: left;">
                            Date: ${`${today.getDate()}/${today.getMonth() +
                              1}/${today.getFullYear()}`}
                         </td>
                        </tr>
                        <tr>
                        <td style="text-align: left;">
                           Brokerage fees for month of: ${datas.fromM} - ${datas.toM} ${datas.year}
                        </td>
                        <td style="text-align: left;">
                           Due date: ${dueDate.toLocaleDateString()}
                        </td>
                     </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                  <td>Trade Id</td>
                  <td>Deal Id</td>
                  <td>Trade date</td>
                  <td>Product</td>
                  <td>Instrument</td>
                  <td>Contract</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Comms Rate</td>
                  <td>Total Comms</td>
               </tr>
                  ${datas.client
                    .map(
                      row => `
                  <tr class="item">
                     <td>${row.id}</td>
                     <td>${row.deal_id}</td>
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
               <tr>
                  <td rowspan="3"></td>
                  <td colspan="7"><strong style="font-size: 10px;">Total Amount Due</strong></td>
                  <td></td>
                  <td style="text-align: center; border-bottom: 1px solid #eee;"><strong style="font-size: 10px;">USD ${total *
                    1.0}</strong></td>      
               </tr>
             </table>
             <br />
             <div class="justify-left bankdets">
               <strong style="font-size: 9;">This is a computer generated document. No signature is required</strong>
               <br/>
               <strong style="font-size: 9;">Please notify us within 7 days if there is any billing error. If the invoice is in good order, kindly make payment to the following bank account by ${dueDate.toLocaleDateString()}:</strong>
            </div>
             <p></p>
             <div class="justify-left bankdets">
               <table cellpadding="0" cellspacing="0" style="width: 90%;">
                  <tr>
                     <th></th>
                     <th style="text-align: left;"><b>Local Payment (within Hong Kong) via bank transfer:</b></th>
                     <th style="text-align: left;"><b>Overseas Payment (Outside of Hong Kong) via TT:</b></th>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Beneficiary name:</td>
                     <td style="text-align: left;">Bright Point International Futures Limited</td>
                     <td style="text-align: left;">Bright Point International Futures Limited</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Beneficiary Bank:</td>
                     <td style="text-align: left;">Bank of China (Hong Kong) Limited, Hong Kong</td>
                     <td style="text-align: left;">United Overseas Bank Limited, Singapore</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Beneficiary Account No.:</td>
                     <td style="text-align: left;">012-916-9-261633-6</td>
                     <td style="text-align: left;">451-907-833-8</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Currency:</td>
                     <td style="text-align: left;">USD</td>
                     <td style="text-align: left;">USD</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Swift Code:</td>
                     <td style="text-align: left;">BKCHHKHHXXX</td>
                     <td style="text-align: left;">UOVBSGSGXXX</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Beneficiary Bank Address:</td>
                     <td style="text-align: left;">Bank of China Tower, 1 Garden Road</td>
                     <td style="text-align: left;">UOB Plaza, 80 Raffles place (S)048624</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Intermediary/Correspondent Bank:</td>
                     <td style="text-align: left;"></td>
                     <td style="text-align: left;">JPMorgan Chase Bank, NA</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;">Intermediary/Correspondent Swift:</td>
                     <td style="text-align: left;"></td>
                     <td style="text-align: left;">CHASUS33</td>
                  </tr>
                  <tr>
                     <td style="text-align: left;"></td>
                     <td style="text-align: left;"><b>Payment by Hong Kong Cheque (Only for HK customer)</b></td>
                     <td style="text-align: left;"><b>Payment by Singapore Cheque (Only for SG Customer)</b>></td>
                  </tr>
                  <tr>
                     <td style="text-align: left;"></td>
                     <td style="width: 37%; text-align: left; word-wrap: break-word;">Crossed cheque by mail to our address at Units 3401-03, 34/F, China Merchants Tower, Shun Tak Centre, 168-200 Connaught Road Central, Sheung Wan, Hong Kong to "Bright Point International Futures Limtied"</td>
                     <td style="width: 37%; text-align: left;">Crossed Cheque by mail to our address at 3 Anson Road #26-01 SpringLeaf Tower (S)079909 to "Bright Point International Futures Limited" <br/> **Attention to "Bright Point International futures Limited Finance"</td>
                  </tr>
               </table>
            </div>
            <p></p>
            <div class="justify-left bankdets">
               Please quote the invoice number(s) when making payment.
               <br/>
               The above "Total Amount Due" should be free and clear from all taxes, bank charges and withholdings
            </div>
          </div>
       </body>
    </html>
    `;
};
