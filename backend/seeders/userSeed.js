import models from '../models/index.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const userSeed = async () => {
    try {
        const users = [
            {
                username: 'user1',
                email: 'user1@example.com',
                password: 'hashed_password',
                phone: '1234567890',
                role: 'customer'
            },
            {
                username: 'admin',
                email: 'admin@example.com',
                password: 'hashed_password',
                phone: '1234567890',
                role: 'admin'
            }
        ];

        for (const user of users) {
            // Hash password
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            await models.User.create({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                phone: user.phone,
                role: user.role
            });
        };

        console.log('✅ User seeding completed successfully');
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

export default userSeed;