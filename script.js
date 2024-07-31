const form = document.getElementById('numberForm');
const ctx = document.getElementById('myChart').getContext('2d');
let chart;

const updateChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Number of Submissions',
        data: values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Number of Submissions'
        }
      }
    }
  });
};

const fetchData = async () => {
  const response = await fetch('/data');
  const data = await response.json();
  updateChart(data);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const number = document.getElementById('number').value;
  
  const response = await fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ number: parseInt(number) })
  });
  
  if (response.ok) {
    const data = await response.json();
    updateChart(data);
  } else {
    const error = await response.json();
    alert(error.error);
  }
});

// Initial load
fetchData();
