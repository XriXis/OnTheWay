import type {Load} from '@sveltejs/kit';
import {Trip} from "../../../lib/Types";
import {serverURL} from "../../../enviroment";

export const load: Load = async ({params}) => {
    const tripId = +(params.tripId as string);
    const trip: Trip = await (await fetch(serverURL + "/api/trips/" + tripId, {
        method: "GET",
    })).json();
    return {
        trip,
    }
}