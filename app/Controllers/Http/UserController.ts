import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UserController {
    public async checkUser({ request, response }: HttpContextContract) {
        try {
            const { phoneNumber } = request.qs()

            const user = await User.findBy('phone_number', phoneNumber)

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

    public async addToBalance() {}
}
