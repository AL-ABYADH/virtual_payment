import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        // Create 5 users for each role
        for (let i = 0; i < 5; i++) {
            await User.updateOrCreate(
                { phoneNumber: `admin_phone${i}` },
                {
                    name: `Admin User ${i}`,
                    phoneNumber: `admin_phone${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )

            await User.updateOrCreate(
                {
                    phoneNumber: `seller_phone${i}`,
                },
                {
                    name: `Seller User ${i}`,
                    phoneNumber: `seller_phone${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )

            await User.updateOrCreate(
                {
                    phoneNumber: `customer_phone${i}`,
                },
                {
                    name: `Customer User ${i}`,
                    phoneNumber: `customer_phone${i}`,
                    balanceYER: 1000000.0,
                    balanceUSD: 1000000.0,
                    balanceSAR: 1000000.0,
                }
            )
        }
    }
}
