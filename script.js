async function createchart() {
  const { xlabels, ytemp } = await getVal();
  const { xlable2, ytemp2 } = await northFunc();
  const { tempsS, yearS } = await South();
  const ctx = document.getElementById("chart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Global Avarage Temperature",
          fill: false,
          data: ytemp,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1
        },
        {
          label: "Northen Hemisphere Temperature",
          fill: false,
          data: ytemp2,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(20, 219, 196, 1)"],
          borderWidth: 1
        },
        {
          label: "Southern Hemisphere Temperature",
          fill: false,
          data: tempsS,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(219, 206, 20, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return value + "°";
              }
            }
          }
        ]
      }
    }
  });
}
createchart();

async function getVal() {
  const xlabels = [];
  const ytemp = [];
  const table = await axios("ZonAnn.Ts+dSST.csv");

  const row = table.data.split("\n").slice(1);
  row.forEach(element => {
    const column = element.split(",");
    const year = column[0];
    const temp = column[1];
    xlabels.push(year);
    ytemp.push(parseFloat(temp) + 14);
  });
  return { xlabels, ytemp };
}

async function northFunc() {
  const xlable2 = [];
  const ytemp2 = [];
  const res = await axios("NH.Ts+dSST.csv");
  const table = res.data.split("\n").slice(2);
  table.forEach(n => {
    const row = n.split(",");
    const year = row[0];
    xlable2.push(year);
    const temp = row[1];
    ytemp2.push(parseFloat(temp) + 14);
  });
  return { xlable2, ytemp2 };
}

async function South() {
  const tempsS = [];
  const yearS = [];
  const response = await axios.get("SH.Ts+dSST.csv");
  const table = response.data.split("\n").slice(2);
  table.forEach(n => {
    const row = n.split(",");
    const year3 = yearS.push(row[0]);
    const temp3 = tempsS.push(parseFloat(row[1]) + 14);
  });

  return { tempsS, yearS };
}
