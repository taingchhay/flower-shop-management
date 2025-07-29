import seedFlowers from "./flowerSeed.js";
import userSeed from "./userSeed.js";
import shippingAddressSeed from "./shippingAddressSeed.js";
import sequelize from "../config/sequelize.js";

async function seed() {
    try {
        await sequelize.sync({ force: true });

        console.log('✅ Database synchronized!');

        await seedFlowers();
        await userSeed();
        await shippingAddressSeed();

        console.log('✅ Seeding completed!');
    } catch (error) {
        console.log('Error in seeding:', error);
    }
};

seed();