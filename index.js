window.onload = function() {
  let pData = populationAPI();
  let exchangeData = exchangeAPI()
  var chart = BuildChart(exchangeData);
}

let test1 = [10,4,3,2,5]

function BuildChart(input1) {
//  console.log("in render function")
//  console.log(input1)

//  console.log(test1)
 let input2 = Array.from(input1, x => x);
 console.log(Object.values(input1))
  for (let i = 0; i < input1.length; i++) {
    dataInput.push(input1[i]);
  }
  console.log(dataInput);
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          label: "test",
          data: test1,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1
        }
        // {
        //   label: "test 2",
        //   data: [],
        //   backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        //   borderColor: ["rgba(54, 162, 235, 1)"],
        //   borderWidth: 1
        // }
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

const exchangeAPI = () => {
  let money = regions[Math.floor(Math.random() * regions.length)];
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let i = 0;
  let excData = [];
  while (i < 5) {
    let newDate = year - i + "-" + month + "-" + date;
    const exchangeAPI = fetch(
      `https://api.exchangeratesapi.io/${newDate}?symbols=${money}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        excData.push(parseFloat(Object.values(data.rates)[0]));
        console.log(excData);
        // console.log(Object.values(data.rates));
      })
      .catch(err => {
        console.log("there was an error in the exchange ");
          location.reload();
      });
    //
    i = i + 1;
  }
  let final = { type: money, data: excData };
  // console.log("in api function")
  console.log(excData)
  // console.log(test1)
  return excData
  // let final = {type:"testtesttest", data:""}
  // return final
};


// exchangeAPI()  
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
  
      // console.log(data.data);
    })
    .catch(err => {
      console.log("there was an error in the population API ");
      location.reload();
    });
}