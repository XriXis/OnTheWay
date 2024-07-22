<script>
    import {tripData, step} from "../Common";
    import {serverURL} from "../../../enviroment"
</script>

<div class="step0">
    <div class="pdiv">
        <p class="q">В какой роли вы хотели бы</p>
        <p class="q">совершить поездку?</p>
    </div>
    <div id="buttonschoose">
        <button id="btnc" class="buttonchoose" on:click={()=>{ tripData.is_request = false; $step++; }}>
            Водитель
        </button>
        <button id="btnc" class="buttonchoose" on:click={()=>{ tripData.is_request = true; $step++; }}>
            Пассажир
        </button>
    </div>
    <div class="img-cont">
        <img id="firstimg" src="{serverURL}/static/images/car-svgrepo-com.svg" alt="hzcho">
    </div>
</div>
