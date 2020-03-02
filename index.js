window.onload = function() {
  
  openModal()
  getAllData()

}


const startLoading = () => {
  let loading = document.getElementById("loading")
  loading.style.zIndex = '2'
}
const stopLoading = () => {
  let loading = document.getElementById("loading")
  loading.style.zIndex = '-1'
}
const changeChart = (chartToHide, chartToShow) => {
  var hide = document.getElementById(chartToHide);
  var show = document.getElementById(chartToShow);
  hide.style.zIndex = '-1';
  show.style.zIndex = '1';

}
const getAllData = async()=> {
  startLoading();
  let dataSet1 = await buildExchangeData()
  let dataSet2 = await buildPopData()
  while ((dataSet1["data"][0]) == null){
    dataSet1 = await buildExchangeData()
  }

  buildLineChart(dataSet1, dataSet2)
  buildBarChart(dataSet1, dataSet2)
}
const buildPopData = async () => {
  let state = states[Math.floor(Math.random() * states.length)];
  let data = []
  await populationAPI(data, state)
  return {data, state}
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


function buildLineChart(dataSet1, dataSet2) {
  stopLoading()
  var ctx = document.getElementById("lineChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          yAxisID: 'A',
          label: dataSet1.title,
          data: dataSet1.data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
          yAxisID: 'B',
          label:` ${dataSet2.state} population`,
          data: dataSet2.data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(54, 162, 235, .5000000)"
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left', 
          scaleLabel: {
            display: true,
            labelString: `1 ${dataSet1.title} `
          }
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: `Population of ${dataSet2.state}`
          }
        }]
      }
    }
  });
  return myChart;
}

function buildBarChart(dataSet1, dataSet2) {

  var ctx = document.getElementById("barChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          yAxisID: 'A',
          label: dataSet1.title,
          data: dataSet1.data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
          yAxisID: 'B',
          label:` ${dataSet2.state} population`,
          data: dataSet2.data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(54, 162, 235, .5000000)"
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left', 
          scaleLabel: {
            display: true,
            labelString: `1 ${dataSet1.title} `
          }
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: `Population of ${dataSet2.state}`
          }
        }]
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
    // location.reload();
      output.push(null)
    // clearCanvas()
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
const populationAPI = async(arr, state) => {
  let url = `https://datausa.io/api/data?drilldowns=State&measures=Population`;
  return fetch(url)
    .then(response => response.json())
    .then(res => {
      res.data.map( el => {
        if (el.State == state){
          arr.push(el.Population)
        }
      })
    })
    .catch(err => {
      console.log("there was an error in the population API ");
      // location.reload();
    });
}

// ======================modal
const openModal = () => {
  let button = document.getElementById("modal")
  let shade = document.getElementById("shade")
  button.style.display = "block"
  shade.style.display = "block"
}
const closeModal = () => {
  let button = document.getElementById("modal")
  let shade = document.getElementById("shade")
  button.style.display = "none"
  shade.style.display = "none"
}

const makeCanvas = () => {
  graphHolder = document.getElementById('graph')
  var bar = document.createElement("canvas");
  bar.id = "barChart"
  var line = document.createElement("canvas");
  line.id = "lineChart"
  graphHolder.appendChild(line)
  graphHolder.appendChild(bar)
}

const clearCanvas = () => {
  graphHolder = document.getElementById('graph')
  bar = document.getElementById('barChart')
  line = document.getElementById('lineChart')
  graphHolder.removeChild(line)
  graphHolder.removeChild(bar)
  makeCanvas()
  getAllData()
}