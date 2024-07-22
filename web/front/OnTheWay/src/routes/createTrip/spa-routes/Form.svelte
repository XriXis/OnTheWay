<script lang="ts">
    import {tripData, step} from "../Common";
    import {url} from "../../../enviroment";
    import {onMount} from "svelte";
    import {Car} from "$lib/Types";
    import {carFetcher} from "$lib/fetchers";

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    let car_: Car;
    onMount(async () => {
        if (tripData.car_id) {
            car_ = await (await fetch(url + "/api/cars/" + tripData.car_id, {})).json();
        }
    })

    let options: string = '';
    if (tripData.allow_luggage) {
        options += "Можно с багажом. "
    }
    if (tripData.allow_pets) {
        options += "Можно с животными. "
    }
    if (tripData.has_child_seat) {
        options += "Детское кресло. "
    }
    if (tripData.has_buster) {
        options += "Бустер. "
    }

    async function submitTrip() {
        console.log(tripData)
        if (tripData.available_seats === null) {
            tripData.available_seats = 4;
        }
        if (tripData.car_id===undefined){
            tripData.car_id=null;
        }
        await fetch(url + "/api/trips/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tripData),
        }).then(async response => {
            if (response.ok) {
                window.location.href = `createTrip/tripCreated`;
            } else {
                window.Telegram.WebApp.showAlert("Something went wrong");
                console.log(response)
            }
        });
    }

</script>
<div class="grey-rect">
    <table id="trip">
        <tr class="line">
            <td class="param-name">
                <p>откуда</p>
            </td>
            <td class="param-val">
                <p>{tripData.start_location}</p>
                {#if tripData.clarify_from != ""}
                    <p>{tripData.clarify_from}</p>
                {/if}
            </td>
        </tr>
        <tr class="line">
            <td class="param-name">
                <p>куда</p>
            </td>
            <td class="param-val">
                <p>{tripData.end_location}</p>
                {#if tripData.clarify_to != ""}
                    <p>{tripData.clarify_to}</p>
                {/if}
            </td>
        </tr>
        <tr class="line">
            <td class="param-name">
                <p>дата</p>
            </td>
            <td class="param-val">
                <p>{formatDate(new Date(tripData.departure_date))}</p>
            </td>
        </tr>
        <tr class="line">
            <td class="param-name">
                <p>время</p>
            </td>
            <td class="param-val">
                <p>{tripData.departure_time}</p>
            </td>
        </tr>
        {#if tripData.is_request === false}
            <tr class="line">
                <td class="param-name">
                    <p>цена</p>
                </td>
                <td class="param-val">
                    <p>{tripData.price}</p>
                </td>
            </tr>
            <tr class="line">
                <td class="param-name">
                    <p>Транспорт</p>
                </td>
                <td class="param-val">
                    {#if car_}
                        <p>{car_.color ? car_.color + ' ' : ''}{car_.brand}</p>
                    {/if}
                </td>
            </tr>
        {/if}
        <tr class="line">
            <td class="param-name">
                <p>мест</p>
            </td>
            <td class="param-val">
                <p>{tripData.available_seats}</p>
            </td>
        </tr>
        {#if tripData.add_info != null}
            <tr class="line">
                <td class="param-name">
                    <p>прочее</p>
                </td>
                <td class="param-val">
                    <p>{tripData.add_info}</p>
                </td>
            </tr>
        {/if}
    </table>
    <p class="data-dop">{options}</p>
</div>
<div class="nav-buttons">
    <button class="next" id="dir-button1" on:click={()=>{$step--}}>Назад</button>
    <button class="next" id="dir-button2" on:click={submitTrip}>Подтвердить</button>
</div>
