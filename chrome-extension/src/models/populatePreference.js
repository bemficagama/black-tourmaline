import { db } from "./db";

export async function populatePreference() {
    await db.preference.add(
        {
            id: 1,
            execute_url: true,
            execute_title: true,
            starting_time: "00:00",
            end_time: "23:59",
            categories: [],
            ages: [],
            url_blocked: [],
            key_blocked: [],
            installed: false,
        },
    );
}