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
                                  客户名称：
                                    <strong style="font-size: 12px;">
                                    ${
                                      datas.client[0].client
                                    }</strong>
                                  </td>
                                  <td style="text-align: left;">
                                     发票序号: HK${datas.invoiceNo}
                                  </td>
                               </tr>
                               <tr>
                               <td style="text-align: left;">
                                 客户地址: ${datas.client[0].address}
                               </td>
                               <td style="text-align: left;">
                                  发票日期: ${`${today.getDate()}/${
                                    today.getMonth() + 1
                                  }/${today.getFullYear()}`}
                               </td>
                              </tr>
                              <tr>
                              <td style="text-align: left;">
                                 服务月份: ${datas.fromM} ${datas.year}
                              </td>
                              <td style="text-align: left;">
                                 此日期前付款: ${dueDate}
                              </td>
                           </tr>
                            </table>
                         </td>
                      </tr>
                      <tr class="heading">
                        <td>交易代码</td>
                        <td>交易所代码</td>
                        <td>交易日期</td>
                        <td>清算账户</td>
                        <td>产品代码</td>
                        <td>产品性质</td>
                        <td>合约月份</td>
                        <td>成交价</td>
                        <td>成交量</td>
                        <td>单吨手续费</td>
                        <td>总手续费</td>
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
                           <td>${row.size} ${row.unit}</td>
                           <td>${row.comms}</td>
                           <td>USD ${row.tcomms}</td>
                        </tr>
                        `
                          )
                          .join(" ")}
                     <tr>
                        <td rowspan="3"></td>
                        <td colspan="7"><strong style="font-size: 12px;">总额:</strong></td>
                        <td></td>
                        <td style="text-align: left; border-bottom: 1px solid #eee;"><strong style="font-size: 10px;">USD 
                        ${Intl.NumberFormat('en-US').format(
                          total * 1.0)
                        }</strong></td>      
                     </tr>
                   </table>
                   ${
                     datas.client[0].deduct_broker_comms
                       ? `<p>佣金将会从 ${datas.client[0].deduct_broker_comms} 亮点的清算账户扣除</p>`
                       : `<br />`
                   }
                   ${
                     datas.client[0].clientid == 142
                       ? `经纪服务由香港提供`
                       : `</>`
                   }
                   <div class="justify-left bankdets">
                     <span style="font-size: 9;">此文件为电脑自动生产，无须签字</span>
                     <br/>
                     <span style="font-size: 9;">发票如有任何问题，请在7天内通知我方修改。如无误，请于 ${dueDate} 前付款，银行细节如下</span>
                  </div>
                   <p></p>
                   <div class="justify-left bankdets">
                     <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                           <th></th>
                           <th style="text-align: left;"><b>电汇支付:</b></th>
                       
                        </tr>
                        <tr>
                           <td style="text-align: left;">受益人全称:</td>
                           <td style="text-align: left;">Bright Point International Futures Limited</td>
                     
                        </tr>
                        <tr>
                           <td style="text-align: left;">受益人银行:</td>
                           <td style="text-align: left;">Bank of China (Hong Kong) Limited, Hong Kong</td>
                   
                        </tr>
                        <tr>
                           <td style="text-align: left;">受益人帐号:</td>
                           <td style="text-align: left;">012-916-9-261633-6</td>
                 
                        </tr>
                        <tr>
                           <td style="text-align: left;">币种:</td>
                           <td style="text-align: left;">USD</td>
               
                        </tr>
                        <tr>
                           <td style="text-align: left;">SWIFT代码:</td>
                           <td style="text-align: left;">BKCHHKHHXXX</td>
                       
                        </tr>
                        <tr>
                           <td style="text-align: left;">受益人银行地址:</td>
                           <td style="text-align: left;">Bank of China Tower, 1 Garden Road</td>
                       
                        </tr>
                   
 
                     </table>
                  </div>
                  <p></p>
                  <div class="justify-left bankdets" style="font-size: 9px;">
                     请付款时标明账单序号
                     <br/>
                     总额不包括税，银行手续费和其他杂费
                     <br/>
                     付款方需承担付款电汇产生费用
                  </div>
                </div>
             </body>
          </html>
          `;
      };
      