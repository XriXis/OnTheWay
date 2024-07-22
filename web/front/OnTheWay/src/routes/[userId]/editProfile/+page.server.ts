import type {Load} from '@sveltejs/kit';
import {Car} from "../../../lib/Types";
import {carFetcher, userFetcher} from "../../../lib/fetchers";

export const load: Load = async ({params}) => {
    const userId = +(params.userId as string);
    const user = await userFetcher(userId);
    let cars_: Car[] = [];
    await carFetcher(cars_, user);
    const cars: Car[] = [...cars_]
    return {
        cars,
        user,
    }
}