<script lang="ts">
    import {onMount} from "svelte";
    import {serverURL} from "../../../enviroment.js";
    import './editProfile.css';
    import type {Car, User} from "$lib/Types";
    import {user} from '../../CurrentUser'

    export let data: {cars: Car[], user: User}

    $user = data.user;
    let cars: Car[] = [];
    if (data.cars && data.cars.length > 0) {
        cars = [...data.cars];
    }

    async function removeCar(id: number): Promise<void> {
        await fetch(`${serverURL}/api/cars/${id}`, {
            method: "DELETE"
        })
        cars = [...cars.filter(car => car.id !== id)]
        $user.car_ids = [...$user.car_ids.filter(_id => _id !== id)];
        $user = {...$user};
    }


    async function submit() {
        let response = await fetch(`${serverURL}/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify($user)
        })
        if (response.ok) {
            $user = {...$user};
            window.history.back();
        } else {
            window.Telegram.WebApp.showAlert("Something went wrong!");
        }
    }


    onMount(()=>{
        let BackButton = window.Telegram.WebApp.BackButton;
        BackButton.show();
        BackButton.onClick(function () {
            window.history.back();
            BackButton.hide();
        });
    });
</script>

<div class="container">
    <div class="grey-rect">
        <div class="desc-img" id="sub-d">
            <p class="dir-desc" id="submit-data">Редактировать профиль</p>
        </div>
        <table id="trip">
            <tr class="line">
                <td class="param-name">
                    <p>Имя</p>
                </td>
                <td class="param-val">
                    {#if $user}
                        <input bind:value={$user.name}>
                    {/if}
                </td>
            </tr>
            <br>
            <tr class="line">
                <td class="param-name">
                    <p>Возраст</p>
                </td>
                <td class="param-val">
                    {#if $user}
                        <input bind:value={$user.age}>
                    {/if}
                </td>
            </tr>
            <br>
            <tr class="line">
                <td class="param-name">
                    <p>Машины</p>
                </td>
                <td class="param-val">
                    <ul class="car-list">
                        {#each cars as car}
                            <li>
                                <button class="remove-car-button" on:click={() => removeCar(car.id)}>&times;</button>
                                <p>{car.color} {car.brand} {car.number}</p>
                            </li>
                        {/each}
                    </ul>
                </td>
            </tr>
        </table>
        <div class="submit-container">
            <button id="primenit" on:click={submit}>Применить</button>
        </div>
    </div>
</div>