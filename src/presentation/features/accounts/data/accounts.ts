import { faker } from "@faker-js/faker"

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const users = Array.from({ length: 500 }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        id: faker.string.uuid(),
        username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
        avatar: faker.image.avatar(),
        email: faker.internet.email({ firstName }).toLocaleLowerCase(),
        emailVerified: faker.datatype.boolean(),
        bio: faker.lorem.sentence(),
        isActive: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(["ADMIN", "NORMAL"]),
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
    }
})
