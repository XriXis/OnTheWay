import type {Load} from '@sveltejs/kit';
import {Car, Trip} from "../../lib/Types";
import {url} from "../../enviroment";
import {carFetcher, userFetcher} from "../../lib/fetchers";

export const load: Load = async ({fetch, url}: {
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    url: URL
}) => {
    const userId = +(url.searchParams.get("userId") as string);
    const user = await userFetcher(userId);
    let cars_: Car[] = [];
    await carFetcher(cars_, user);
    const cars: Car[] = [...cars_]
    return {
        cars
    }
}