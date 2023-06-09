export function getOSPopularity(interactions) {
    const iOS_Interactions = interactions.filter(interaction => {
        return interaction.OS === "iOS"
    });
    const android_IndInteractions = interactions.filter(interaction => {
        return interaction.OS === "Android"
    });
    const other_IndInteractions = interactions.filter(interaction => {
        if (interaction.OS != "iOS" && interaction.OS != "Android") {
            return true;
        }
    });
    return { "iOS": iOS_Interactions.length, "Android": android_IndInteractions.length, "Other": other_IndInteractions.length }
    console.table({
        "iOS:": iOS_Interactions.length,
        "Android:": android_IndInteractions.length,
        "Other": other_IndInteractions.length
    });
}

export function getLastFiveLeads(users) {
    return users.slice(users.length - 5);
}


export function getVisitsByDay(interactions) {
    const weekdays = {
        'Sun': 0,
        //'Mon': 1,
        //'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6
    };
    const visitsByDay = Array.from({ length: 7 }, () => 0);

    interactions.forEach(visit => {
        const day = visit.date.split(' ')[0];
        visitsByDay[weekdays[day]]++;
    });
    return visitsByDay;
}


export function getConvertionRate(interactions, users) {
    const rate = Math.floor((users.length * 100) / interactions.length)
    const convertion = {
        "totalLeads": users.length,
        "totalInteractions": interactions.length,
        "convertionRate": `${rate}%`
    };
    return convertion;
}

export function getLocationByPlace(users) {
    const locations = {
        'pance': 0,
        'ciudad-jardin': 1,
        'granada': 2
    };
    const visitsByLocation = Array.from({ length: 3 }, () => 0);

    users.forEach(user => {
        if (user.location) {
            const loc = user.location;
            visitsByLocation[locations[loc]]++;
        }
    });
    console.table(visitsByLocation);
    return visitsByLocation;
}