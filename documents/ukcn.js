// module.exports = ({ name, price1, price2, receiptId }) => {
    module.exports = (datas) => {
        const today = new Date();
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + datas.client[0].duedate);
      
        dueDate = `${dueDate.getDate()}/${
          dueDate.getMonth() + 1
        }/${dueDate.getFullYear()}`;
      
        let total = 0;
        for (let i = 0; i < datas.client.length; i++) {
          total += datas.client[i].tcomms;
        }
        let gst = 0;
        if (datas.client[0].in_sg === 1) {
          gst = 8;
        }
 
        let usdTotal = Math.round((total + (total * gst) / 100) * 100) / 100;
       
      
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
                         color: #000000;
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
                                           Credit Note No: UC${datas.invoiceNo}
                                        </td>
                                     </tr>
                                     <tr>
                                     <td style="text-align: left;">
                                       Address: ${datas.client[0].address}
                                     </td>
                                     <td style="text-align: left;">
                                        Date: ${`${today.getDate()}/${
                                          today.getMonth() + 1
                                        }/${today.getFullYear()}`}
                                     </td>
                                    </tr>
                                    <tr>
                                       <td style="text-align: left;">
                                          Brokerage fees for month of: ${
                                            datas.fromM
                                          } ${datas.year}
                                       </td>
                                    </tr>
                                  </table>
                               </td>
                            </tr>
                            <tr class="heading">
                              <td>Trade Id</td>
                              <td>Deal Id</td>
                              <td>Trade date</td>
                              <td>Account</td>
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
                                  (row) => `
                              <tr class="item">
                                 <td>${row.id}</td>
                                 <td>${row.deal_id}</td>
                                 <td>${row.trade_date}</td>
                                 <td>${row.account}</td>
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
                              <td colspan="7"><strong style="font-size: 12px;">Total Amount Due</strong></td>
                              <td/>
                              <td style="text-align: center; border-bottom: 1px solid #eee;"><strong style="font-size: 10px;">USD ${Intl.NumberFormat('en-US').format(usdTotal)}</strong></td>      
                           </tr>
    
                         </table>
                         ${
                           datas.client[0].deduct_broker_comms
                             ? `<p>Net Outstanding shall be deducted from the clearing account ${datas.client[0].deduct_broker_comms} held with BPI</p>`
                             : `<br />`
                         }
                         <div class="justify-left bankdets">
                           <strong style="font-size: 9;">This is a computer generated document. No signature is required</strong>
                           <br/>
                           <strong style="font-size: 9;">Please notify us within 7 days if there is any billing error. If the Credit Note is in good order, kindly make payment to the following bank account:</strong>
                         </div>
                         <p></p>
                         <div class="justify-left bankdets">
                           Payment by TT:
                           <br/>
                           Beneficiary name:                         Bright Point International Financial (UK) Limited
                           <br/>
                           Beneficiary bank:                         Investec Bank PLC
                           <br/>
                           IBAN:                                     GB53IVES40644707308860
                           <br/>
                           Currency:                                 USD
                           <br/>
                           Swift code:                               IVESGB2L
                           <br/>
                           Beneficiary Bank address:                 30 Gresham St, London EC2V 7QN, UK
                           <br/>
                           Intermediary/Correspondent Bank:          Wells Fargo Bank N.A
                           <br/>
                           Intermediary/Correspondent Swift code:    PNBPUS3NNYC
                        </div>
                        <p></p>
                        <div class="justify-left bankdets">
                           Payment by Cheque:
                           <br/>
                           Crossed cheque by mail to our address at Suite 706, 83 Victoria Street, London SW1H 0HW should be made payable
                           <br/>
                           to Bright Point International Financial (UK) Limited
                        </div>
                        <p></p>        
                        <div class="justify-left bankdets">
                           Please quote the Credit Note number(s) when making payment.
                           <br/>
                           The above "Total Amount Due" should be free and clear from all taxes, bank charges and withholdings
                           <br/>
                           The remitter bears all charges of the banks engaged in the transfer of the payment
                        </div>
                     </div>
                   </body>
                </html>
                `;
      };
      