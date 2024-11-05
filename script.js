const rowsPerPage = 10;
let currentPage = 0;
let cryptoData = [];
totalNumOfCoins = 0


// Fetch data from API
async function fetchCryptoData() {
  try {
    const start = currentPage * rowsPerPage;
    const response = await fetch(`https://api.coinlore.net/api/tickers/?start=${start}&limit=${rowsPerPage}`);
    const data = await response.json();
    totalNumOfCoins = data.info.coins_num
    cryptoData = data.data.map(item => ({
      coin: item.name,
      code: item.symbol,
      price: `$${parseFloat(item.price_usd).toFixed(2)}`,
      supply: `${parseFloat(item.tsupply)} ${item.symbol}`
      
    }));
    renderTable(currentPage);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render the table based on page
function renderTable(page) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  //const start = (page - 1) * rowsPerPage;
  //const end = start + rowsPerPage;
  //const paginatedData = cryptoData.slice(start, end);
  

  cryptoData.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="" data-label="Coin">${data.coin}</td>
      <td data-label="Code">${data.code}</td>
      <td class="bottom-section" data-label="Price">${data.price}</td>
      <td data-label="Total Supply">${data.supply}</td>
    `;
    tableBody.appendChild(row);
  });
  const start = currentPage * rowsPerPage;
  const lastData = start + rowsPerPage  


  document.getElementById("prevButton").style.visibility = page === 0 ? "hidden" : "visible";
  document.getElementById("nextButton").style.visibility = lastData >= totalNumOfCoins ? "hidden" : "visible";
  //document.getElementById("prevButton").style.display = page === 1 ? "none" : "inline-block";
 //document.getElementById("nextButton").style.display = end >= cryptoData.length ? "none" : "inline-block";
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    fetchCryptoData();
  }
}

function nextPage() {
//   if ((currentPage * rowsPerPage) < cryptoData.length) {
     currentPage++;
    fetchCryptoData();
   //}
}

// Fetch and display data on page load
fetchCryptoData();