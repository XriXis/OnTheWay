<script>
    import {tripData, step} from "../Common";
</script>

<div class="grey-rect">
    <div class="header">
        <p id="param-text">Параметры</p>
        <hr id="hr">
    </div>
    <ul class="choice" id="param">
        <li class="param-li">
            <label for="lag">
                <input type="checkbox" id="lag" bind:checked={tripData.allow_luggage}>
                <div class="checkbox__checkmark"></div>
                Есть место для багажа
            </label>
        </li>
        <li class="param-li">
            <label for="an">
                <input type="checkbox" id="an" bind:checked={tripData.allow_pets}>
                <div class="checkbox__checkmark"></div>
                Можно с животными
            </label>
        </li>
        <li class="param-li">
            <label for="ch">
                <input type="checkbox" id="ch" bind:checked={tripData.has_child_seat}>
                <div class="checkbox__checkmark"></div>
                Есть детское кресло
            </label>
        </li>
        <li class="param-li">
            <label for="bu">
                <input type="checkbox" id="bu" bind:checked={tripData.has_buster}>
                <div class="checkbox__checkmark"></div>
                Есть бустер
            </label>
        </li>
    </ul>

    <textarea id="add" class="com" placeholder="Дополнительные сведения о поездке..." bind:value={tripData.add_info}/>


</div>
<div class="nav-buttons">
    <button class="next" on:click={()=>{
        if (!tripData.is_request && tripData.car_id >= 2)
            $step--
        else
            $step-=2
    }}>
        Назад
    </button>
    <button class="next"
        on:click={() => {
            $step++;
        }}>
        Далее
    </button>
</div>
