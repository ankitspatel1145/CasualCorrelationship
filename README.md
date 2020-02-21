# Welcome to the CasualCorrelationship Wiki!

## Live Site 
[Casual Correlationships](https://ankitspatel1145.github.io/CasualCorrelationship/ "Casual Correlationships")



## Background
![alt text](https://github.com/ankitspatel1145/CasualCorrelationship/blob/master/assets/newlogo.png "Logo image")

People often confuse correlation and causation when looking at data sets.

* Causation is when one variable directly influences another, like average income vs highest level of education completed. We know this is causation because higher paying jobs often require more knowledge, education, and training.
* Correlation is when 2 datasets look like they are directly related, but are not. An example would be ice cream sales vs sunglasses sales. The two numbers are correlated because one does not influence the other. We can assume that there is another variable that causes both of them, like temperature.


The purpose of this site is to show people that you can correlate any 2 data sets, even if they have no relationship. The app will generate a graph/chart based on 2 random datasets. The user can select different categories for each dataset and style of chart/graph

## MVP
* User will be able to click a button to randomly generate a relationship graph
* User can choose the style in which the data is displayed
* User can interact with the data on the graph to see data point

## Design
The site will be a simple 1 page layout with a nav bar on top that controls the data shown. It will have a random button to generate a random set of graphs. Below that will be the chart that will be created based on the input. There will be different styles of charts available.

## Main show page
![alt text](https://github.com/ankitspatel1145/CasualCorrelationship/blob/master/assets/casual.png "Main page")



## Technology
Javascript for frontend Chart.js for graphs and various APIs for data
### APIs
* Currency conversion rates were obtained from: https://api.exchangeratesapi.io 
* Population data was obtained from: https://datausa.io/api/

### Chart.js
Once the proper data was compiled, it was fed into Chart.js.
Using the Chart.js chart type field, the display type of the graph can be easily changed form "bar" to "line"

Each data set was givin a unique "id" under "yAxes" in the options field. This made it possible to display two differnt y-axes on either side of the graph to represent the data sets.

```javascript
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
```


To implement loading icon and the ability to switch graphy styles without reloading the page, Z-indexing was used to hide and show items. When user clicks "Bar Graph", the line graph canvas z-index is set to -1 and the bar bar graph z-index is set to +1. 


```javascript
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
```

## To-do:
* add more APIs to get more variation in data sets.
* implement randomization function with more APIs

