import type {Load} from '@sveltejs/kit';
import {Trip} from "../../lib/Types";
import {serverURL} from "../../enviroment";

export const load: Load = async ({fetch, url}: {
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    url: URL
}) => {
    const userId = url.searchParams.get("userId");

    const ownTrips = await (await fetch(`${serverURL}/api/finished/driver/${userId}`, {
        method: "GET",
    })).json();
    const participatedTrips = await (await fetch(`${serverURL}/api/finished/rider/${userId}`, {
        method: "GET"
    })).json();


    return {
        ownTrips,
        participatedTrips,
    }
}