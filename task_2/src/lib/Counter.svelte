<script lang="ts">
  import { currencyGet } from './api';

  export let inputVall = 0; // Начальное значение первого инпута
  export let inputVallSecond = 0; // Начальное значение второго инпута
  export let currency = ''; // Валюта первого инпута
  export let currencySecondVall = ''; // Валюта второго инпута

  let thisCurrency = 1; // Курс валюты по умолчанию (второго инпута)
  let currencyList: string[] = []; // Список валют для выбора

  async function fetchCurrencyData(currencyName?: string) {
    const currencyData = await currencyGet(currencyName);
    // console.log(currencyData)
    // console.log(currencyData.conversion_rates[currencySecondVall])
    thisCurrency = currencyData.conversion_rates[currencySecondVall] ?? 1; 
    inputVallSecond = inputVall * thisCurrency;
    inputVall = inputVallSecond / thisCurrency; 
    currencyList = Object.keys(currencyData.conversion_rates); 
  }

  function currencySend(str: string, idInput: number) {
    // Функция для обновления выбранной валюты
    if (idInput === 1) {
      currency = str;
      fetchCurrencyData(str); 
    } else {
      currencySecondVall = str; 
      fetchCurrencyData(currency); 
    }
  }

  function handleInput(event: any) {
    inputVall = Number(event.target.value); 
    inputVallSecond = parseFloat((inputVall * thisCurrency).toFixed(2));
  }

  function handleInputDivision(event: any) {
   
    inputVallSecond = Number(event.target.value); 
    inputVall = parseFloat((inputVallSecond / thisCurrency).toFixed(2));
  }

  fetchCurrencyData(); 
</script>

<div class="inputWrapper">
  <input type="number" on:input={handleInput} placeholder="Напишите число" value={inputVall}/>

  <div class="btn-wrapp">
    <div class="btn">{currency}</div>   
    <div class="modal_window">
      {#each currencyList as list}
        <div class="currency" on:click={() => currencySend(list, 1)}>{list}</div>
      {/each}
    </div>
  </div>
</div>
<div class="inputWrapper">
  <input type="number" on:input={handleInputDivision} placeholder="Напишите число" value={inputVallSecond}/>

  <div class="btn-wrapp">
    <div class="btn">{currencySecondVall}</div>   
    <div class="modal_window">
      {#each currencyList as list}
        <div class="currency" on:click={() => currencySend(list, 2)}>{list}</div>
      {/each}
    </div>
  </div>
</div>


<style>
    input {
        background: #323232;
        border: 1px  solid #9c9c9c5d;
        padding: 15px 20px;
        border-radius: 10px;
        outline:none;
        font-size: 20px;
        color: #fff;
        width: 100%;
        margin-bottom: 10px;
    }
    input:last-child {
        margin-bottom: 0;
    }
    input:focus {
        border: 1px  solid #9c9c9cbb;
    }
    .btn {
        padding: 15px 20px;
        font-size: 20px;
        border: none;
        background: #1a1a1a;
        border-radius: 10px;
        width: 100px;
    }
    .btn:hover {    
        border: none;
        background-color: #101010;
    }
    .btn:focus {
        outline: none;
        background: #000;
    }
    .inputWrapper {
        display: flex;
        gap: 10px;
        width: 80%;
        margin:  0 auto;
        position: relative;
    }
    .modal_window {
        position: absolute;
        opacity: 0;
        right: 0;
        width: 100%;
        z-index: -10;
        background-color: #1a1a1a;
        border-radius:10px;
        padding: 20px 0px;
        max-height: 300px;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .btn-wrapp {
        position: relative;
    }

    .btn-wrapp:hover .modal_window{
        opacity: 1;
        z-index: 2;
    }
    .modal_window .currency {
        padding: 10px 20px;
        cursor: pointer;
        display: block;
        transition: 0.3s;
    }
    .modal_window .currency:hover {
        background-color: #0f0f0f;
    }
</style>


