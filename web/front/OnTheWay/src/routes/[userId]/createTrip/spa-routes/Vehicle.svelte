<script lang="ts">
    import {tripData, step, carType} from "../Common";
    import {serverURL} from "../../../../enviroment";

    $: if (carType.carType === "taxi") {
        tripData.car_id = 0;
    } else if (carType.carType === "carsh") {
        tripData.car_id = 1;
    } else {
        tripData.car_id = undefined;
    }

</script>
<img src="{serverURL}/static/images/ruble-svgrepo-com.svg" class="date-img" alt="calendar">

    {#if tripData.is_request === false}
        <div class="grey-rect">
        <p class="dir-desc">Вид и цена поездки</p>
        <div class="type">
            <ul class="choice">
                <li>
                    <label for="own">
                        <input bind:group={carType.carType} type="radio" id="own" name="r" value="own">
                        <div class="checkbox__checkmark"></div>
                        На своей машине
                    </label>
                </li>
                <li>
                    <label for="carsh">
                        <input bind:group={carType.carType} type="radio" id="carsh" name="r" value="carsh">
                        <div class="checkbox__checkmark"></div>
                        Каршеринг
                    </label>
                </li>
                <li>
                    <label for="taxi">
                        <input bind:group={carType.carType} type="radio" id="taxi" name="r" value="taxi">
                        <div class="checkbox__checkmark"></div>
                        Совместное такси
                    </label>
                </li>
            </ul>
        </div>

        <div class="price">
            <p class="choose-price">Цена в рублях:</p>
            <input type="number" id="price-rub" step="50" min="0" bind:value={tripData.price}>
        </div>
            <div class="av-text">
                Свободных мест 
                <input type="number" list="places" step="1" min="1" max="4" id="av" class="number-input" placeholder="4"
                       bind:value={tripData.available_seats}/>
                <datalist id="places">
                    <option value="1">
                    <option value="2">
                    <option value="3">
                    <option value="4">
                </datalist>
            </div>
        </div>

    {:else}
    <div class="grey-rect">
        <div class="av-text">
            Сколько свободных мест нужно?
            <input type="number" list="places" step="1" min="1" max="4" id="av" class="number-input" placeholder="4"
                   bind:value={tripData.available_seats}/>
            <datalist id="places">
                <option value="1">
                <option value="2">
                <option value="3">
                <option value="4">
            </datalist>
        </div>
    </div>
    {/if}



<div class="nav-buttons">
    <button class="next" on:click={() => { $step-- }}>Назад</button>
    <!--        TODO: validation over vehicle choice       -->
    <button class="next" on:click={() => {
        (!tripData.is_request && tripData.car_id!==0 && tripData.car_id!==1)
        ? $step++
        : $step += 2; console.log(tripData)
    }}>Далее
    </button>
</div>
