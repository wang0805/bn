// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = datas => {
  const today = new Date();
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + datas.client[0].duedate);

  let total = 0;
  for (let i = 0; i < datas.client.length; i++) {
    total += datas.client[i].tcomms;
  }
  let gst = 0;
  if (datas.client[0].in_sg === 1) {
    gst = 7;
  }
  let sgd = Math.round(total * (1 / datas.exrate) * 100) / 100;

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
             <body>
             <img style="position: absolute; top: -100px; left: 0px;" src="bpi.png"> 
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
                                    Brokerage fees for month of: ${
                                      datas.fromM
                                    } - ${datas.toM} ${datas.year}
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
                        <td colspan="7"><strong style="font-size: 10px;">Subtotal</strong></td>
                        <td/>
                        <td style="text-align: center;">USD ${total}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="6">GST</td>
                        <td style="text-align: right;">${gst}%</td>
                        <td style="text-align: center;">SGD ${(total * gst) /
                          100}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5"><strong style="font-size: 12px;">Total Amount Due</strong></td>
                        <td/>
                        <td style="text-align: center; border-bottom: 1px solid #eee;"><strong style="font-size: 10px;">USD ${total +
                          (gst * total) / 100}</strong></td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="8" style="text-align: center;">For GST reporting purpose SGD 1 = USD ${
                          datas.exrate
                        }</td>
                        <td style="text-align: right;"></td>   
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5">Amount in SGD</td>
                        <td/>
                        <td style="text-align: center;">SGD ${sgd}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5" >GST</td>
                        <td style="text-align: right;">${gst}%</td>
                        <td style="text-align: center;">SGD ${(sgd * gst) /
                          100}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5">Total Amount (SGD)</td>
                        <td/>
                        <td style="text-align: center;">SGD ${sgd +
                          (gst * sgd) / 100}</td>      
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
                     Payment by TT:
                     <br/>
                     Beneficiary name:          Bright Point International Futures (SG) Pte Ltd
                     <br/>
                     Beneficiary bank:          United Overseas Bank Limited, Singapore
                     <br/>
                     Beneficiary Account No.:   451-907-917-2
                     <br/>
                     Currency:                  USD
                     <br/>
                     Swift code:                UOVBSGSGXXX
                     <br/>
                     Beneficiary Bank address:  UOB Plaza, 80 Raffles Place, Singapore 048624
                     <br/>
                     Intermediary:              JPMorgan Chase Bank, NA
                     <br/>
                     Intermediary:              CHASUS33
                  </div>
                  <p></p>
                  <div class="justify-left bankdets">
                     Payment by Cheque:
                     <br/>
                     Crossed cheque by mail to our address at 3 Anson Road #26-01 Springleaf Tower (S) 079909 should be made payable
                     <br/>
                     to Bright Point International Futures (SG) Pte. Ltd
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
