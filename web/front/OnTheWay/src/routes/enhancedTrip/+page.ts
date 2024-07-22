import type {Load} from '@sveltejs/kit';
import {Trip} from "../../lib/Types";
import {serverURL} from "../../enviroment";

export const load: Load = async ({fetch, url}: {
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    url: URL
}) => {
    const tripId = +(url.searchParams.get("tripId") as string);
    const trip: Trip = await (await fetch(serverURL + "/api/trips/" + tripId, {
        method: "GET",
    })).json();
    return {
        trip,
    }
}