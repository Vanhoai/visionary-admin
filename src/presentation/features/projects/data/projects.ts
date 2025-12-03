import { faker } from "@faker-js/faker"

// Set a fixed seed for consistent data generation
faker.seed(54321)

export const projects = Array.from({ length: 100 }, () => {
    const tags = [
        "React",
        "TypeScript",
        "Node.js",
        "Next.js",
        "Python",
        "Docker",
        "AWS",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
    ] as const

    return {
        id: `PRJ-${faker.number.int({ min: 1000, max: 9999 })}`,
        name: faker.lorem.words({ min: 2, max: 4 }),
        description: faker.lorem.sentence({ min: 5, max: 15 }),
        github: `https://github.com/${faker.internet.username()}/${faker.lorem.slug()}`,
        tags: faker.helpers.arrayElements(tags, { min: 2, max: 4 }),
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
    }
})
