import models from '../models/index.js';

const shippingAddressSeed = async () => {
    try {
        const shippingAddresses = [
            {
                userId: 1,
                street: 'Flower Street',
                city: 'Flower City',
                commune: 'FL',
                province: 'Flower Province',
                postalCode: '12345',
                country: 'Cambodia',
                label: 'Home'
            },
            {
                userId: 1,
                street: 'Bloom Avenue',
                city: 'Bloom Town',
                commune: 'BT',
                province: 'Bloom Province',
                postalCode: '67890',
                country: 'Cambodia',
                label: 'Office'
            }
        ];

        await models.ShippingAddress.bulkCreate(shippingAddresses);
        console.log('✅ Shipping addresses seeded successfully');
    } catch (error) {
        console.error("Error seeding shipping addresses:", error);
    }
};

export default shippingAddressSeed;