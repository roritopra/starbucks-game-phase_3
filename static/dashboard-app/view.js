class View {
  static barItem = document.querySelector("#myBarChart");
  static doughnutItem = document.querySelector("#myDoughnutChart");
  static lineItem = document.querySelector("#locationChart");
  static fiveLeadsTable = document.querySelector("table");

  constructor() {
    this.doughnutChart;
    this.barChart;
    this.locationChart;
  }

  getHello() {
    this.onHello();
  }

  getBarChart() {
    const config = {
      type: "bar",
      data: {
        labels: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgb(210, 157, 73)",
              "rgb(0,98,65,255)",
              "rgb(30,57,50,255)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    this.barChart = new Chart(View.barItem, config);
    //this.barChartUpdate(this.barChart);
  }

  getDoughnutChart() {
    const data = {
      labels: ["Android", "iOS", "Other"],
      datasets: [
        {
          label: "My First Dataset",
          data: [50, 50, 50],
          backgroundColor: [
            "rgb(210, 157, 73)",
            "rgb(0,98,65,255)",
            "rgb(30,57,50,255)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const config = {
      type: "doughnut",
      data: data,
    };

    this.doughnutChart = new Chart(View.doughnutItem, config);
    //this.doughnutChartUpdate(this.doughnutChart);
  }

  getLocationChart() {
    const labels = ["Pance", "Ciudad Jardín", "Granada"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [0, 0, 0],
          backgroundColor: [
            "rgb(210, 157, 73)",
            "rgb(0,98,65,255)",
            "rgb(30,57,50,255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const config = {
      type: "bar",
      data: data,
    };
    this.locationChart = new Chart(View.lineItem, config);
  }

  updateTable(newData) {
    View.fiveLeadsTable.innerHTML = "";
    //console.table(newData);
    newData.forEach((element) => {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${element.name}</td>
             <td>${element.email}</td>
             <td>${element.phone}</td>
             <td>${element.location}</td>
             `;
      View.fiveLeadsTable.appendChild(row);
    });
  }

  updateBarChart(newDataset) {
    //console.log(this.barChart);
    //console.log('Hey within Update barChart');
    this.barChart.data.datasets[0].data = newDataset.splice(2);
    //this.barChart.data.labels = newDataset.labels;
    this.barChart.update();
  }

  // [pance: number, ciudad-jardin: number, granada: number]
  updateLocationChart(newDataset) {
    this.locationChart.data.datasets[0].data = newDataset;
    this.locationChart.update();
  }

  updateDoughnutChart(newDataset) {
    //console.log(this.doughnutChart);
    //console.log('Hey within Update doughnutChart');
    this.doughnutChart.data.datasets[0].data = newDataset;
    //this.doughnutChart.data.labels = ;
    this.doughnutChart.update();
  }

  render() {
    this.getBarChart();
    this.getDoughnutChart();
    this.getLocationChart();
  }
}
