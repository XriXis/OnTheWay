<script lang="ts">
    import {serverURL} from '../../../enviroment';

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
</script>

<p id="success">Успешно!</p>
<p id="created">Ваше объявление создано</p>
<p id="message">Бот отправит Вам сообщение об откликнувшихся пассажирах</p>
<div id="botton">
    <button id="again" on:click={()=>{window.location.href=`../createTrip?userId=${userId}`}}>Создать ещё одну поездку</button>
</div>
<img id="car" src="{serverURL}/static/images/Frame%203.svg" alt="car">
<p id="color-value"></p>
