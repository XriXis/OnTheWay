<script lang="ts">
    import {onMount} from "svelte";
    import {serverURL} from "../../enviroment.js";
    import type {Car, User} from "$lib/Types";
    import AddCar from "$lib/AddCar.svelte";
    import './profile.css';
    import {carFetcher, userFetcher} from "$lib/fetchers";
    import {user} from "../CurrentUser";

    export let data: { cars: Car[], user: User }

    $user = data.user;
    let userUrl: string = `${serverURL}/api/users/${data.user.id}`;

    let cars: Car[] = [];
    if (data.cars && data.cars.length > 0) {
        cars = [...data.cars];
    }

    onMount(async () => {
        window.Telegram.WebApp.expand();
        let BackButton = window.Telegram.WebApp.BackButton;
        BackButton.show();
        BackButton.onClick(function () {
            window.location.href = "availableTrips";
            BackButton.hide();
        });
    });

</script>
{#key user}
    <div class="lala">
        <p id="name">{$user.name}</p>
    </div>

    <img src="{userUrl}/photo" alt="Аватарка" id="avatar"/>
    <div class="bio">
        <p id="age">Возраст: {$user.age}</p>
        <p id="sex">Пол: {$user.sex ? "Женский" : "Мужской"}</p>
        <p id="rides">Поездок: {$user.rides_amount}</p>
    </div>
    <div class="PhotoCar">
        <img id="carPhoto" src="{serverURL}/static/icons/image-22.svg" alt="section-icon">
    </div>
    <div id="cars">
        <p id="MyCars">Мои машины:</p>
        <div class="mashini">
            {#if !$user.car_ids}
                <p>У вас ещё нет добавленных машин.</p>
            {:else }
                <ul id="cars-ul">
                    {#each cars as car}
                        <li><p class="car">{car.color} {car.brand} {car.number}</p></li>
                    {/each}
                </ul>
            {/if}

        </div>
    </div>
    <AddCar bind:carsDestination={cars}>
        <a id="addcar">Добавить машину</a>
    </AddCar>
    <button id="redt" on:click={()=>{window.location.href = 'editProfile';}}>Редактировать</button>
{/key}