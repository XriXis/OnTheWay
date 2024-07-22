<script lang="ts">
    import {onMount} from "svelte";
    import Choice from "./spa-routes/Choice.svelte";
    import Place from "./spa-routes/Place.svelte";
    import Time from "./spa-routes/Time.svelte";
    import Options from "./spa-routes/Options.svelte";
    import Vehicle from "./spa-routes/Vehicle.svelte";
    import Cars from "./spa-routes/Cars.svelte";
    import Form from "./spa-routes/Form.svelte";
    import "./createTrip.css";
    import {tripData, step} from "./Common";
    import {Car} from "$lib/Types";

    export let data: { cars: Car[] }
    const cars = data.cars;
    const order = [
        Choice,
        Place,
        Place,
        Time,
        Vehicle,
        Cars,
        Options,
        Form,
    ]

    onMount(() => {
        window.Telegram.WebApp.expand();
    })
</script>

<div id="content-wrap">
    {#key step}
        <svelte:component this={order[$step]}/>
    {/key}
</div>