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
    import {tripData, step, fetchedCars} from "./Common";
    import {Car, User} from "../../../lib/Types";

    export let data: { cars: Car[], user: User }
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

    $fetchedCars = data.cars;
    tripData.driver_id = data.user.id;
</script>

<div id="content-wrap">
    {#key step}
        <svelte:component this={order[$step]}/>
    {/key}
</div>