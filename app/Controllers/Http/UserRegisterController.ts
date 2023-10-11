import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserRegisterController {
    public async register({ request, response }: HttpContextContract) {
        try {
            // Validate the request data
            const validationSchema = schema.create({
                phoneNumber: schema.string({}, [
                    rules.required(),
                    rules.unique({ table: 'users', column: 'phone_number' }),
                ]),
                name: schema.string({}, [
                    rules.required(),
                    rules.alpha({ allow: ['space'] }),
                    rules.maxLength(50),
                ]),
            })

            const messages = {
                required:
                    'The {{ field }} is required to create a new account.',
                maxLength:
                    'The {{ field }} should not exceed {{ options.maxLength }} characters.',
                alpha: 'The {{ field }} should only contain alphabets.',
                'phoneNumber.unique': 'Phone number already in use',
            }

            const data = await request.validate({
                schema: validationSchema,
                messages: messages,
            })

            const user = await User.create(data)

            return user
        } catch (err) {
            return response.status(400).send({
                status: 'error',
                message: 'Validation failed',
                errors: err.messages,
            })
        }
    }
}
