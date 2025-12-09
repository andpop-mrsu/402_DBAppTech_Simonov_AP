// js/db.js — IndexedDB для Hangman

const DB_NAME = "hangmanDB";
const DB_VERSION = 1;

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("games")) {
                const store = db.createObjectStore("games", {
                    keyPath: "id",
                    autoIncrement: true
                });
                store.createIndex("date", "date");
            }

            if (!db.objectStoreNames.contains("attempts")) {
                const store = db.createObjectStore("attempts", {
                    keyPath: "id",
                    autoIncrement: true
                });
                store.createIndex("game_id", "game_id");
            }
        };

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function saveGame(game) {
    const db = await openDB();
    const tx = db.transaction("games", "readwrite");
    tx.objectStore("games").add(game);
    return tx.complete;
}

export async function updateGame(game) {
    const db = await openDB();
    const tx = db.transaction("games", "readwrite");
    tx.objectStore("games").put(game);
    return tx.complete;
}

export async function saveAttempt(attempt) {
    const db = await openDB();
    const tx = db.transaction("attempts", "readwrite");
    tx.objectStore("attempts").add(attempt);
}

export async function getAllGames() {
    const db = await openDB();
    return new Promise(resolve => {
        const tx = db.transaction("games", "readonly");
        const req = tx.objectStore("games").getAll();
        req.onsuccess = () => resolve(req.result);
    });
}

export async function getAttempts(gameId) {
    const db = await openDB();
    return new Promise(resolve => {
        const tx = db.transaction("attempts", "readonly");
        const index = tx.objectStore("attempts").index("game_id");
        const req = index.getAll(gameId);
        req.onsuccess = () => resolve(req.result);
    });
}
