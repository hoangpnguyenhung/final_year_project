import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { PaymentRequestDto } from './payment.dto';
import * as querystring from 'qs';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/entity/ticket.entity';
import { Repository } from 'typeorm';

@Controller('payment')
export class PaymentController {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>){}
    
    formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return Number(`${year}${month}${day}${hours}${minutes}${seconds}`);
    }

    @Post('create_payment_url')
    async createPaymentUrl(@Body() paymentRequestDto: PaymentRequestDto, @Res() res: any, @Request() req: any) {
      const ipAddr = "127.0.0.1";

      const tmnCode = "6BPTH6TF";
      const secretKey = "KVLELKYIEYGYKDEUZHSZFFKYWFSRJPRM";
      const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      const returnUrl = "http://localhost:3000/lich-su-dat-ve";

      const date = new Date();
      const dateExpire = new Date(date.getTime() + 15 * 60 * 1000)

      const createDate: number = this.formatDate(date);
      const dateExpired: number = this.formatDate(dateExpire);
      const orderId = paymentRequestDto.orderId;
      const amount: number = paymentRequestDto.amount;
      const bankCode = "NCB" || "";

      const orderInfo = `Thanh-toan-tien-ve${orderId}`;
      const orderType = "other";
      let locale = 'vn';
      if (locale === null || locale === '') {
        locale = 'vn';
      }
      const currCode = 'VND';
      const vnpParams: any = {};
      vnpParams['vnp_Version'] = '2.1.0';
      vnpParams['vnp_Command'] = 'pay';
      vnpParams['vnp_TmnCode'] = tmnCode;
      vnpParams['vnp_Locale'] = locale;
      vnpParams['vnp_CurrCode'] = currCode;
      // vnpParams['vnp_TxnRef'] = Math.floor(Math.random() * 1100000);
      vnpParams['vnp_TxnRef'] = orderId;
      vnpParams['vnp_OrderInfo'] = orderInfo;
      vnpParams['vnp_OrderType'] = orderType;
      vnpParams['vnp_Amount'] = amount * 100;
      vnpParams['vnp_ReturnUrl'] = returnUrl;
      vnpParams['vnp_IpAddr'] = ipAddr;
      vnpParams['vnp_CreateDate'] = createDate;
      // vnpParams['vnp_ExpireDate'] = dateExpired;
      if (bankCode !== null && bankCode !== "") {
        vnpParams['vnp_BankCode'] = bankCode;
      }

      const sortedParams = this.sortObject(vnpParams);
      // const sortedParams = {};
      //   Object.keys(vnpParams)
      //     .sort()
      //     .forEach((key) => {
      //       sortedParams[key] = vnpParams[key];
      // });

      let signData = querystring.stringify(sortedParams, { encode: false });
      // let signData = querystring.stringify(sortedParams, { encode: false }); // new
      let hmac = crypto.createHmac("sha512", secretKey);
      // let hmac = crypto.HmacSHA256(signData, secretKey) //new
      let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
      // let signed =  crypto.enc.Hex.stringify(hmac); //new
      // sortedParams['vnp_SecureHashType'] = 'SHA256'; //new
      sortedParams['vnp_SecureHash'] = signed;
      const queryParams = querystring.stringify(sortedParams, { encode: false });
      const vnpFullUrl = `${vnpUrl}?${queryParams}`;

      res.status(200).json(vnpFullUrl)

      await this.ticketRepository.update(paymentRequestDto.orderId, {status: "processing"})
    }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }
}