const URL = "https://api.thingspeak.com/channels/3096396/feeds.json?api_key=NKF7SS9JG4XWVGNG&results=10";

const tempoEl = document.getElementById("tempo");
const somEl = document.getElementById("som");
const ledEl = document.getElementById("led");
const ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'TempoMinChegada', data: [], borderColor: 'blue', fill: false },
      { label: 'AtivarSom', data: [], borderColor: 'orange', fill: false },
      { label: 'AtivarLED', data: [], borderColor: 'green', fill: false }
    ]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { position: 'top' }, 
      title: { display: true, text: 'Dados da Parada Inteligente' } 
    },
    scales: { y: { beginAtZero: true } }
  }
});

// função para buscar e atualizar os dados
function atualizarDados() {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if(data.feeds.length === 0) return;

      const lastFeed = data.feeds[data.feeds.length - 1];
      tempoEl.textContent = lastFeed.field1;
      somEl.textContent = lastFeed.field2;
      ledEl.textContent = lastFeed.field3;

      // atualizar gráfico
      chart.data.labels = data.feeds.map(f => 
        new Date(f.created_at).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})
      );
      chart.data.datasets[0].data = data.feeds.map(f => Number(f.field1) || 0);
      chart.data.datasets[1].data = data.feeds.map(f => Number(f.field2) || 0);
      chart.data.datasets[2].data = data.feeds.map(f => Number(f.field3) || 0);

      chart.update("active");
    })
    .catch(err => console.error("Erro ao buscar dados:", err));
}

// atualiza a cada 5 segundos
atualizarDados();
setInterval(atualizarDados, 4000);
