export async function currencyGet(currencyName?: string) {
  try {
    const currencyUrl = currencyName ?? "USD";
    const urlCurrency = `https://v6.exchangerate-api.com/v6/0faad44f6544d3cdac0deb28/latest/${currencyUrl}`;
    const response = await fetch(urlCurrency);
    if (!response.ok) {
      throw new Error("Error!!!!!!!!!");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
