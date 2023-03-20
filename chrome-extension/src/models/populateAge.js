import { db } from "./db";

export async function populateAge() {
    await db.age.bulkAdd([
        { name: "00 à 10 anos" },
        { name: "11 à 12 anos"},
        { name: "13 à 14 anos"},
        { name: "15 à 16  anos"}
    ])
}