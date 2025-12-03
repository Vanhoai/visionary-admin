import { faker } from "@faker-js/faker"

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const blogs = Array.from({ length: 100 }, () => {
    const categories = ["Android", "iOS", "Web", "Design", "Research", "Backend", "Frontend"]

    return {
        id: faker.string.uuid(),
        authorId: faker.string.uuid(),
        name: faker.lorem.sentence({ min: 3, max: 6 }),
        isPublished: faker.datatype.boolean(),
        stars: faker.number.int({ min: 0, max: 5000 }),
        views: faker.number.int({ min: 0, max: 100000 }),
        estimatedReadTime: faker.number.int({ min: 1, max: 20 }),
        categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        markdown: faker.lorem.paragraphs({ min: 5, max: 10 }),
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
    }
})
