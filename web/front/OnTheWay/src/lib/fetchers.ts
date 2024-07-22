import type {Car, User} from "./Types";
import {serverURL} from "../enviroment";

export async function carFetcher(destination: Car[], user: User): Promise<void> {
    if (!user) {
        return;
    }
    if (!user.car_ids){
        return ;
    }
    for (const id of user.car_ids) {
        destination.push(await (await fetch(serverURL + "/api/cars/" + id, {})).json());
    }
}

export async function userFetcher(id: number): Promise<User> {
    return await (await fetch(serverURL + "/api/users/" + id, {
        method: "GET",
    })).json();
}