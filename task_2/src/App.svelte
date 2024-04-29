
<script lang="ts">
  import Counter from "./lib/Counter.svelte"; 
</script>

<main>
  <h1>Конвертируйте валюту</h1> 
  <div class="input-wrapp">
    <Counter inputVall={1} currency="USD" currencySecondVall="RUB" inputVallSecond={1}/> 
  </div>
</main>

<style>

</style>
