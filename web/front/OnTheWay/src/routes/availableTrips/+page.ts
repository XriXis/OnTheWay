import type {Load} from '@sveltejs/kit';
import {Trip} from "../../lib/Types";
import {serverURL} from "../../enviroment";

async function filterTripsSideEffect(trips: Trip[]): Promise<Trip[]> {
    let hrs = Number(new Date().toLocaleTimeString().split(':')[0]);
    let min = Number(new Date().toLocaleTimeString().split(':')[1]);
    let day = Number(new Date().toLocaleDateString().split('/')[0]);
    let mon = Number(new Date().toLocaleDateString().split('/')[1]);
    {
        let toDelete: number[] = [];
        for (let trip of trips) {
            let tripHrs = Number(trip.departure_time.split("-")[1].split(':')[0]);
            let tripmin = Number(trip.departure_time.split("-")[1].split(':')[1]);
            let tripday = Number(trip.departure_date.split("-")[0]);
            let tripmon = Number(trip.departure_date.split("-")[1]);
            let cond1 = day > tripday && mon == tripmon || mon > tripmon;
            let cond2 = day == tripday && mon == tripmon && (hrs > tripHrs || min > tripmin && hrs == tripHrs);
            if (cond1 || cond2) {
                await fetch(`${serverURL}/api/trips/` + trip.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                toDelete.push(trip.id)
            }
        }
        trips = trips.filter(trip => {
            return !toDelete.includes(trip.id)
        })
    }
    return trips;
}

export const load: Load = async ({fetch, url}: {
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    url: URL
}) => {
    const userId = url.searchParams.get("userId");
    const trips_: Trip[] = await (await fetch(serverURL + "/api/trips", {
        method: "GET",
    })).json();
    const trips = await filterTripsSideEffect(trips_);
    const driversTrips = trips.filter((trip: Trip) => !trip.is_request);
    const ridersTrips = trips.filter((trip: Trip) => trip.is_request);
    const appliedTrips = await (await fetch(`${serverURL}/api/trips/awaited/${userId}`, {
        method: "GET",
    })).json();

    return {
        trips,
        driversTrips,
        ridersTrips,
        appliedTrips
    }
}