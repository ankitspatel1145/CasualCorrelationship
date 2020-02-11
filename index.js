window.onload = function() {
  getAllData()
}

const getAllData = async()=> {
  let dataSet1 = await buildExchangeData()
  // let dataSet2 = await buildExchangeData()
  dataSet2 = {data:[1,4,6,3,4],
              title: "testtitle"}
  // console.log(stuff1)
  BuildChart(dataSet1, dataSet2)
}

const buildExchangeData = async () => {
  let money = regions[Math.floor(Math.random() * regions.length)];
  let data = [];

  i = 0
  while (i < 5){
    await exchangeAPI(i, data, money)
    i = i + 1
  }
  output = {data,
            title: `EUR to ${money} exchange rate`
  }
  return output
}


function BuildChart(dataSet1, dataSet2) {
  console.log("chart:", dataSet1.data)
  console.log("chart:", dataSet2.data)
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          label: dataSet1.title,
          data: dataSet1.data,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1
        },
        {
          label: dataSet2.title,
          data: dataSet2.data,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  return myChart;
}
//  random picker ==================================


const apis = [
  '#FFFFFF',
  '#F06B4F',
  '#F2AE52',
  '#B0CD6D',
  '#A33120'
];

function randomApi(apis) {
  return apis[Math.floor(Math.random() * apis.length)];
}


// apis ==========================================
const regions = [
  "CAD",
  "HKD",
  "LVL",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "AUD",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "LTL",
  "JPY",
  "THB",
  "CHF",
  "SGD",
  "PLN",
  "BGN",
  "TRY",
  "CNY",
  "NOK",
  "NZD",
  "ZAR",
  "USD",
  "MXN",
  "EEK",
  "GBP",
  "KRW",
  "MYR",
  "HRK"
]

const exchangeAPI = async(i, output, money) => {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  
  let newDate = year - i + "-" + month + "-" + (date - 1);
  let url = `https://api.exchangeratesapi.io/${newDate}?symbols=${money}`
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let val = Object.values(data.rates)
      output.push(val[0])
    })
    .catch(err => {
    location.reload();
    console.log("error:", err);
    });
};


// StateAPI()  
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]
const populationAPI = () => {
  let state = states[Math.floor(Math.random() * states.length)];
  let popData = [];
  const exchangeAPI = fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data
      // console.log(data.data);
    })
    .catch(err => {
      console.log("there was an error in the population API ");
      location.reload();
    });
}