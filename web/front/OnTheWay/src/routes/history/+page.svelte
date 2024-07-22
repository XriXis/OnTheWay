<script lang="ts">
    import FinishedTrip from "$lib/FinishedTrip.svelte";
    import {serverURL} from "../../enviroment";
    import type {Trip} from "$lib/Types";
    import {onMount} from "svelte";
    import DivisionHeader from "$lib/DivisionHeader.svelte";

    export let data: {ownTrips: Trip[], participatedTrips: Trip[]}

    let ownTrips: Trip[] = data.ownTrips;
    let participatedTrips: Trip[] = data.participatedTrips;
    let tripsToShow: Trip[] = [...ownTrips];
    let type: boolean = true;
    $: name_color = type ? "#fbea50ab" : "#d0cecee6";

    onMount(async () => {
            let BackButton = window.Telegram.WebApp.BackButton;
            BackButton.show();
            BackButton.onClick(function () {
                window.history.back();
                BackButton.hide();
            });
        }
    );
</script>
<br><br><br>
{#key type}
    <DivisionHeader
            bind:type={type}
            bind:tripShowLeftCollection={ownTrips}
            bind:tripShowRightCollection={participatedTrips}
            bind:destinationCollection={tripsToShow}

            default_label="Мои заявки"
            optional_label="Мои отклики"/>
    <div class="scrolling" id="main-scrolling-div" style="--owner-bg-col: {name_color}">
        {#if tripsToShow && tripsToShow.length !== 0}
            {#each tripsToShow as trip}
                <FinishedTrip trip={trip}></FinishedTrip>
            {/each}
        {:else}
            <p>Вы еще не совершили ни одну поедку.</p>
        {/if}
    </div>
{/key}
