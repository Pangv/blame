// this function creates a new keyword in the database as part of the "keywords" collection in a real-time database
// when the keyword is added a counter goes up by one any keyword can only be added once
// the function takes a string as an argument and returns nothing
// if the keyword already exists in the database, the counter goes up by one

import {child, get, getDatabase, onValue, ref, set} from "firebase/database";
import {Dispatch, SetStateAction} from "react";


let database: any;

export const initDatabase = (app: any) => {
     database = getDatabase(app);
}

export const createKeyword = (keyword: string) => {
    const keywordRef = ref(database, 'keywords/' + keyword);

    // Check if the keyword already exists
    get(child(keywordRef,'count')).then((snapshot) => {
        if (snapshot.exists()) {
            // If the keyword exists, increment the count
            set(keywordRef, {name: keyword, totalcount: snapshot.val()+1, count: snapshot.val() + 1});
        } else {
            // If the keyword does not exist, create it with a count of 1
            set(keywordRef, {name: keyword, totalcount: 1, count: 1});
        }
    });
}


export const getTop5Keywords = async () => {
    const keywordsRef = ref(database, 'keywords');
    const top5Keywords: any[] = [];

    const snapshot = await get(keywordsRef);
    snapshot.forEach((childSnapshot) => {
        top5Keywords.push(childSnapshot.val());
    });

    // get the top 5 keywords
    top5Keywords.sort((a, b) => b.totalcount - a.totalcount);
    top5Keywords.splice(5);

    return top5Keywords;
}

// this function listens for changes to the keywords collection in the database
// when a keyword is added or its count is incremented, the function returns an array of keyword objects
// the function takes a callback function as an argument and returns the array of keyword objects

export const listenForChanges = (callback:  Dispatch<SetStateAction<never[]>>) => {
    const keywordsRef = ref(database, 'keywords');

    // Return the unsubscribe function
    return onValue(keywordsRef, (snapshot) => {
        const keywords: any[] = [];
        snapshot.forEach((childSnapshot) => {
            keywords.push(childSnapshot.val());
        });
        // @ts-ignore
        callback(keywords);
    });
}

// write a function that's increase the count of a keyword in the database
// this function takes a string as an argument and returns nothing
// the function increases the count of the keyword in the database by one

export const increaseKeywordCount = (keyword: string) => {
    const keywordRef = ref(database, 'keywords/' + keyword);
    let totalCounter = 0;
    get(child(keywordRef, 'totalcount')).then((snapshot) => {
        if (snapshot.exists()) {
            totalCounter = snapshot.val();
        }
    });

    get(child(keywordRef, 'count')).then((snapshot) => {
        if (snapshot.exists()) {
            // If the keyword exists, increment the count
            set(keywordRef, {name: keyword, totalcount: totalCounter, count: snapshot.val() + 1});
        }
    });
}

// write a function thats sets all keyword counts to 0 in the database
// this function takes nothing as an argument and returns nothing
// the function sets all keyword counts to 0 in the database

export const resetAllKeywordCounts = () => {
    const keywordsRef = ref(database, 'keywords');
    get(keywordsRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            set(child(childSnapshot.ref, 'count'), 0);
        });
    });
}


