import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class PaymentController {
    public async pay({ request, response }: HttpContextContract) {
        try {
            // Validate the request data
            const validationSchema = schema.create({
                from: schema.string({}, [rules.required()]),
                to: schema.string({}, [rules.required()]),
                amount: schema.number([rules.required()]),
                currency: schema.enum(['YER', 'USD', 'SAR', rules.required()]),
            })

            const messages = {
                required:
                    'The {{ field }} is required to create a new account.',
                enum: 'The {{ field }} should be "YER", "USD", or "SAR".',
            }

            const data = await request.validate({
                schema: validationSchema,
                messages: messages,
            })

            const fromUser = await User.findBy('phone_number', data.from)
            const toUser = await User.findBy('phone_number', data.to)

            if (!fromUser) {
                return response.status(404).send({
                    status: 'error',
                    message: `User with phone number (${data.from}) not found.`,
                })
            } else if (!toUser) {
                return response.status(404).send({
                    status: 'error',
                    message: `User with phone number (${data.to}) not found.`,
                })
            }

            switch (data.currency) {
                case 'YER':
                    if (fromUser.balanceYER >= data.amount) {
                        fromUser.balanceYER -= data.amount
                        toUser.balanceYER += data.amount
                    } else
                        throw new Exception(
                            `Balance in ${data.currency} not enough for payment. Please recharge your ${data.currency} balance, or convert from other currencies.`
                        )
                    break
                case 'USD':
                    if (fromUser.balanceUSD >= data.amount) {
                        fromUser.balanceUSD -= data.amount
                        toUser.balanceUSD += data.amount
                    } else
                        throw new Exception(
                            `Balance in ${data.currency} not enough for payment. Please recharge your ${data.currency} balance, or convert from other currencies.`
                        )
                    break
                case 'SAR':
                    if (fromUser.balanceSAR >= data.amount) {
                        fromUser.balanceSAR -= data.amount
                        toUser.balanceSAR += data.amount
                    } else
                        throw new Exception(
                            `Balance in ${data.currency} not enough for payment. Please recharge your ${data.currency} balance, or convert from other currencies.`
                        )
                    break
            }

            await fromUser.save()
            await toUser.save()

            return response.ok({ message: 'Transfer successful.' })
        } catch (err) {
            return response.status(400).send({
                status: 'error',
                message: err.message,
                errors: err.messages,
            })
        }
    }
}
