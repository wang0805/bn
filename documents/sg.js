// module.exports = ({ name, price1, price2, receiptId }) => {
module.exports = datas => {
  const today = new Date();
  let total = 0;
  for (let i = 0; i < datas.client.length; i++) {
    total += datas.client[i].tcomms;
  }
  let sgd = Math.round(total * datas.exrate * 100) / 100;

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
                   line-height: 21px;
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
                        <td colspan="7">Subtotal</td>
                        <td/>
                        <td style="text-align: center;">USD ${total}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="6">SGD</td>
                        <td style="text-align: right;">${datas.exrate}</td>
                        <td style="text-align: center;">SGD ${sgd}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5" >GST</td>
                        <td style="text-align: right;">7%</td>
                        <td style="text-align: center;">SGD ${sgd *
                          0.07}</td>      
                     </tr>
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="5"><strong style="font-size: 12px;">Total</strong></td>
                        <td/>
                        <td style="text-align: center; border-bottom: 1px solid #eee;"><strong style="font-size: 10px;">SGD ${sgd *
                          1.07}</strong></td>      
                     </tr>
                   </table>
                   <br />
                   <div class="justify-left"><strong style="font-size: 9;">Please notify us within 7 days if there is any billing error. If the invoice is in good order, kindly make payment to the following bank account:</strong></div>
                   <div class="justify-left bankdets">
                   Payment by TT:
                   <br/>
                   Beneficiary name          Bright Point International Futures (SG) Pte Ltd
                   <br/>
                   Beneficiary back          United Overseas Bank Limited, Singapore
                   <br/>
                   Beneficiary Account No.   451-907-917-2
                   <br/>
                   Currency                  USD
                   <br/>
                   Swift code                UOVBSGSGXXX
                   <br/>
                   Beneficiary Bank address  UOB Plaza, 80 Raffles Place, Singapore 048624
                   <br/>
                   Intermediary              JPMorgan Chase Bank, NA
                   <br/>
                   Intermediary              CHASUS33
                   </div>
                </div>
             </body>
          </html>
          `;
};
