<script lang="ts">
    import {url} from '../../../enviroment';
</script>

<p id="success">Успешно!</p>
<p id="created">Ваше объявление создано</p>
<p id="message">Бот отправит Вам сообщение об откликнувшихся пассажирах</p>
<div id="botton">
    <button id="again" on:click={()=>{window.location.href="../createTrip"}}>Создать ещё одну поездку</button>
</div>
<img id="car" src="{url}/static/images/Frame%203.svg" alt="car">
<p id="color-value"></p>
