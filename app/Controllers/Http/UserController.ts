import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UserController {
    public async checkPaymentAccount({
        request,
        response,
    }: HttpContextContract) {
        try {
            const { phoneNumber } = request.qs()

            const user = await User.findBy('phone_number', phoneNumber)

            // console.log(user)
            // console.log(phoneNumber)

            if (user) {
                return response.status(200).json({ message: 'User exists.' })
            } else {
                return response.status(404).json({ message: 'User not found.' })
            }
        } catch (error) {
            return response
                .status(500)
                .json({ message: 'An error occurred while checking user.' })
        }
    }
    public async checkBalance({ request, response }: HttpContextContract) {
        try {
            const { phoneNumber } = request.qs()
            const { currency } = request.qs()

            const user = await User.findBy('phone_number', phoneNumber)

            // console.log(user)
            // console.log(phoneNumber)

            if (!user) {
                return response.status(404).json({ message: 'User not found.' })
            }

            let balance: number
            switch (currency) {
                case 'USD':
                    balance = user.balanceUSD
                    break
                case 'YER':
                    balance = user.balanceYER
                    break
                case 'SAR':
                    balance = user.balanceSAR
                    break
                default:
                    return response
                        .status(400)
                        .json({ message: 'Invalid currency' })
            }
            return response.status(200).json({ balance: balance })
        } catch (error) {
            return response
                .status(500)
                .json({ message: 'An error occurred while checking user.' })
        }
    }

    public async addToBalance() {}
}
