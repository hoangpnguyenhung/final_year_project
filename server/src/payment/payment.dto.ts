export class PaymentRequestDto {
    amount: number
    clientIp: number
    locale: string
    returnUrl: string
    transactionId: number
    orderInfo: number
    merchant: string
    paymentType: string
    version: string
    bankCode: string
    currency: string
    createDate: Date
    hashSecret: string
    url: string
    orderId: string
}