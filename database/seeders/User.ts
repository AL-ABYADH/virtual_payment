import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        // Create 5 users for each role
        for (let i = 0; i < 5; i++) {
            await User.updateOrCreate(
                {
                    phoneNumber: `77777777${i}`,
                },
                {
                    name: `Admin User ${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )

            await User.updateOrCreate(
                {
                    phoneNumber: `77777778${i}`,
                },
                {
                    name: `Seller User ${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )

            await User.updateOrCreate(
                {
                    phoneNumber: `77777788${i}`,
                },
                {
                    name: `Customer User ${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )
        }

        // Create TrustTech account
        User.updateOrCreate(
            {
                phoneNumber: `788888888`,
            },
            {
                name: `TrustTech`,
                balanceYER: 1000000.0,
                balanceUSD: 1000000.0,
                balanceSAR: 1000000.0,
            }
        )
    }
}
