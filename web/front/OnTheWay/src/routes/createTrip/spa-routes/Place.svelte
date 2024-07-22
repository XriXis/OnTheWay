<script lang="ts">
    import {serverURL} from "../../../enviroment";
    import {tripData, step, activeButton} from "../Common";
    function validate(): boolean {
        if (tripData.start_location == "") {
            window.Telegram.WebApp.showAlert("Пожалуйста, выберите город отправления");
            return false;
        }
        return true;
    }

</script>


<div class="grey-rect">
    <div class="desc-img">
        {#if $step === 1}
            <p class="dir-desc">Откуда</p>
        {:else}
            <p class="dir-desc">Куда</p>
        {/if}
        <img src="{serverURL}/static/icons/location-pin-alt-svgrepo-com.svg"
             class="dir-image"
             alt="Location Pin"
        />
    </div>
    <div class="but-text">
        {#if $step === 1}
            <div class="buttons">
                <button
                        class="button1"
                        id="left1"
                        on:click={() => {
              tripData.start_location = "Иннополис";
              tripData.end_location = "Казань";
              $activeButton = "Иннополис";
            }}
                        style='background-color: {$activeButton === "Иннополис" ? "#969696" : ""}'
                >
                    Иннополис
                </button>
                <button
                        class="button1"
                        id="right1"
                        on:click={() => {
              tripData.start_location = "Казань";
              tripData.end_location = "Иннополис";
              $activeButton = "Казань";
            }}
                        style="background-color: {$activeButton === 'Казань' ? '#969696' : ''}"
                >
                    Казань
                </button>
            </div>
            <textarea
                    id="comment1"
                    class="com"
                    placeholder="Уточните место отправления..."
                    bind:value={tripData.clarify_from}
            />
        {:else}
            <div class="buttons">
                <button
                        class="button1"
                        id="left1"
                        on:click={() => {}}
                        style="background-color: {tripData.start_location === 'Казань' ? '#969696' : ''}"
                >
                    Иннополис
                </button>
                <button
                        class="button1"
                        id="right1"
                        on:click={() => {}}
                        style="background-color: {tripData.start_location === 'Иннополис' ? '#969696' : ''}"
                >
                    Казань
                </button>
            </div>
            <textarea
                    id="comment2"
                    class="com"
                    placeholder="Уточните место прибытия..."
                    bind:value={tripData.clarify_to}
            />
        {/if}
    </div>
</div>
<div class="nav-buttons">
    <button class="next" on:click={() => $step--}>Назад</button>
    <button class="next" on:click={() => {if (validate()) {$step++;}}}>Далее</button>
</div>
  