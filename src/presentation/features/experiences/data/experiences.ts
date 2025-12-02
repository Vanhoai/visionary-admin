import { faker } from "@faker-js/faker"

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const experiences = Array.from({ length: 100 }, () => {
    const technologies = [
        "AI",
        "Machine Learning",
        "Android",
        "iOS",
        "Web Development",
        "Cloud Computing",
        "Data Science",
        "DevOps",
        "Cybersecurity",
        "Blockchain",
    ] as const

    return {
        id: `EXP-${faker.number.int({ min: 1000, max: 9999 })}`,
        position: faker.lorem.sentence({ min: 3, max: 5 }),
        company: faker.company.name(),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        technologies: faker.helpers.arrayElements(technologies, { min: 2, max: 3 }),
        isCurrent: faker.datatype.boolean(),
        startDate: faker.date.past().getTime(),
        endDate: faker.datatype.boolean() ? faker.date.recent().getTime() : null,
    }
})
