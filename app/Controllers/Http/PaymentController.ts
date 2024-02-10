import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class PaymentController {
    public async pay({ request, response }: HttpContextContract) {
        try {
            const from = request.input('from')
            const to = request.input('to')
            const amount = request.input('amount')
            const currency = request.input('currency')

            // console.log(amount)

            if (!from) {
                return response.status(400).send({
                    message: 'The "from" parameter is required.',
                })
            }

            if (!to) {
                return response.status(400).send({
                    message: 'The "to" parameter is required.',
                })
            }

            if (!amount || isNaN(amount)) {
                return response.status(400).send({
                    message:
                        'The "amount" parameter is required and must be a number.',
                })
            }

            if (!currency || !['YER', 'USD', 'SAR'].includes(currency)) {
                return response.status(400).send({
                    message:
                        'The "currency" parameter is invalid. It should be "YER", "USD", or "SAR".',
                })
            }

            // Find users by phone number
            const fromUser = await User.findBy('phone_number', from)
            const toUser = await User.findBy('phone_number', to)

            if (!fromUser) {
                return response.status(404).send({
                    message: `User with phone number (${from}) not found.`,
                })
            } else if (!toUser) {
                return response.status(404).send({
                    message: `User with phone number (${to}) not found.`,
                })
            }

            switch (currency) {
                case 'YER':
                    if (fromUser.balanceYER >= Number(amount)) {
                        fromUser.balanceYER -= Number(amount)
                        toUser.balanceYER += Number(amount)
                    } else
                        throw new Exception(
                            `Balance in ${currency} not enough for payment. Please recharge your ${currency} balance, or convert from other currencies.`
                        )
                    break
                case 'USD':
                    if (fromUser.balanceUSD >= Number(amount)) {
                        fromUser.balanceUSD -= Number(amount)
                        toUser.balanceUSD += Number(amount)
                    } else
                        throw new Exception(
                            `Balance in ${currency} not enough for payment. Please recharge your ${currency} balance, or convert from other currencies.`
                        )
                    break
                case 'SAR':
                    if (fromUser.balanceSAR >= Number(amount)) {
                        fromUser.balanceSAR -= Number(amount)
                        toUser.balanceSAR += Number(amount)
                    } else
                        throw new Exception(
                            `Balance in ${currency} not enough for payment. Please recharge your ${currency} balance, or convert from other currencies.`
                        )
                    break
            }

            await fromUser.save()
            await toUser.save()

            return response.ok({ message: 'Transfer successful.' })
        } catch (err) {
            return response.status(400).send({
                message: err.message,
                errors: err.messages,
            })
        }
    }
}
