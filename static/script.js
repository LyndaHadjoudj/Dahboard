loadData();

function loadData() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET','/api/data2');
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            jsonData = JSON.parse(httpRequest.response);
             update_Bars(jsonData);
        }
    };
    httpRequest.send();

    httpRequest2 = new XMLHttpRequest();
    httpRequest2.open('GET', '/api/data');
    httpRequest2.onreadystatechange = function () {
        if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
            jsonData2 = JSON.parse(httpRequest2.response);
             update_Lines(jsonData2);
        }
    };
    httpRequest2.send();

    httpRequest3 = new XMLHttpRequest();
    httpRequest3.open('GET', '/api/data3');
    httpRequest3.onreadystatechange = function () {
        if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
            jsonData3 = JSON.parse(httpRequest3.response);
             update_Pie(jsonData3);
        }
    };
    httpRequest3.send();

    httpRequest4 = new XMLHttpRequest();
    httpRequest4.open('GET', '/api/data1');
    httpRequest4.onreadystatechange = function () {
        if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
            jsonData4 = JSON.parse(httpRequest4.response);
             update_BigNumbers(jsonData4);
        }
    };
    httpRequest4.send();

    httpRequest5 = new XMLHttpRequest();
    httpRequest5.open('GET', '/api/data4');
    httpRequest5.onreadystatechange = function () {
        if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
            jsonData5 = JSON.parse(httpRequest5.response);
            update_Doughnut(jsonData5);
        }
    };
    httpRequest5.send();

    httpRequest6 = new XMLHttpRequest();
    httpRequest6.open('GET', '/api/data5');
    httpRequest6.onreadystatechange = function () {
        if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
            jsonData6 = JSON.parse(httpRequest6.response);
            update_HorizontalBar(jsonData6);
        }
    };
    httpRequest6.send();

    httpRequest7 = new XMLHttpRequest();
    httpRequest7.open('GET', '/api/data6');
    httpRequest7.onreadystatechange = function () {
        if (httpRequest7.readyState === 4 && httpRequest7.status === 200) {
            jsonData7 = JSON.parse(httpRequest7.response);
            update_Radar(jsonData7);
        }
    };
    httpRequest7.send();

    httpRequest8 = new XMLHttpRequest();
    httpRequest8.open('GET', '/api/data7');
    httpRequest8.onreadystatechange = function () {
        if (httpRequest8.readyState === 4 && httpRequest8.status === 200) {
            jsonData8 = JSON.parse(httpRequest8.response);
             update_Lines2(jsonData8);
        }
    };
    httpRequest8.send();
}
function update_Lines(jsonData){
	var labels = jsonData.years;
	for(d of jsonData.datasets){
		d.fill = false;
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;
	}
	var data = jsonData.datasets;
	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {
			responsive: false,
			maintainAspectRatio: true,
			 scales: {
             yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
			legend:{
				position:'top'
			},
		}
	});
}

function update_Bars(jsonData) {
    var labels = jsonData.years.map(function (e) {
        return e;
    });

    var data = jsonData.datasets.map(function (e) {
       return e.data[0]
    });
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "studentNumber",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850,#5EA274"],
                    data: data
                }
            ]
        },
           options: {
		  responsive: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
          title: {
                display: true,
                text: 'Predicted number of students per year'
            }
        }
    });
}

function update_Pie(jsonData){
	var labels = jsonData.years.map(function(e) {
	   return e;
	});

	var data = jsonData.datasets.map(function(e) {
	   return e.data;
	});

	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
		    label:"Number of students",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#d3b37e","#c45850"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  legend:{
			position:'right'
		  }
		}
	});
}

function update_BigNumbers(jsonData){
	var i=1;
	j=0;
	for(d of jsonData){
		region = document.getElementById("specialite"+i);
		label = document.getElementsByClassName("specialiteLabel")[j];
		pop = document.getElementsByClassName("specialiteNum")[j];
		label.innerHTML = "specialite_"+i;
		pop.innerText = d;
		i++;
		j++;
	}
}

function update_Doughnut(jsonData){
	var labels = jsonData.datasets.map(function(e) {
	   return e.label;
	});

	var data = jsonData.datasets.map(function(e) {
	   return e.data;
	});

	new Chart(document.getElementById("doughnut-chart"), {
		type: 'doughnut',
		data: {
		  labels: labels,
		  datasets: [{
			label: "number of man",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#d3b37e","#c45850","#CEDF3C","#3CD8DF"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'Predicted number of women in each specialty'
		  },
		  legend:{
			position:'right'
		  }
		}
	});
}
function update_HorizontalBar (jsonData){
	var labels = jsonData.datasets.map(function(e) {
	   return e.label;
	});
    var arrayData=[]
    function DataValue(){
	    jsonData.datasets.map(function(e) {
	    arrayData =  arrayData.concat(e.data);
	    })
	    return arrayData
	}
     data=DataValue()
	new Chart(document.getElementById("HorizontalBar-chart"), {
		type: 'horizontalBar',
		data: {
		  labels: labels,
		  datasets: [{
			label: "number of students",
			backgroundColor: ["#3e95cd","#8e5ea2","#3cba9f",'#3CD8DF',"#d3b37e","#c45850","#CEDF3C"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: true,
			text: 'number of women per speciality'
		  },
		  scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
		  legend:{
			position:'right'
		  }
		}
	});
}

function update_Radar(jsonData){
    var Labels = jsonData.years.map(function(e) {
	   return e;
	});

	var data1 = jsonData.datasets[0].data;
	var data2 = jsonData.datasets[1].data;
console.log(data1);

	new Chart(document.getElementById("Radar-chart"), {
    type: 'radar',
    data: {
      labels:Labels,
      datasets: [
        {
          label: "Femme",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data:data1
        }, {
          label: "Homme",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: data2
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Distribution in % of world population'
      }
    }
});
}
function update_Lines2(jsonData){
	var labels = jsonData.years;
	console.log(labels)
	for(d of jsonData.datasets){
		d.fill = false;
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;
	}
	console.log(jsonData.datasets)
	var data = jsonData.datasets;
    new Chart(document.getElementById("Line-chartTwo"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {
			responsive: false,
			maintainAspectRatio: true,
			 scales: {
             yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
			legend:{
				position:'top'
			},
		}
	});
}