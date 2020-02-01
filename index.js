// import * as functions from './functions'

const output = fetch("http://api.worldbank.org/v2/region?format=json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here

    console.log(data);
  })
  .then(data => {
    renderChart()
  })
  .catch(err => {
    // Do something for an error here
  });
//

const renderChart = () => {

  var ctx = document.getElementById("myChart")
  var ctx2 = document.getElementById("myChart2")
  
  
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: 'Bar Dataset',
          data: [10, 20, 14, 28,19,1,5,37],
          // this dataset is drawn below
          order: 1
        }, {
          label: 'Line Dataset',
          data: [50, 23, 10, 50],
          type: 'line',
          // this dataset is drawn on top
          order: 2
        }]
    },
    options: {
      title: {
        display: true,
        text: "hellooooo"
      },
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




