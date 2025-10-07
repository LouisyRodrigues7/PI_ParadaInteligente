// URLs das duas paradas
const URL_PARADA1 = "https://api.thingspeak.com/channels/3096396/feeds.json?api_key=NKF7SS9JG4XWVGNG&results=10";
const URL_PARADA2 = "https://api.thingspeak.com/channels/3102167/feeds.json?api_key=3EFVUAMPT6UA7AJ3&results=10";

// Elementos HTML para mostrar últimos valores
const tempo1El = document.getElementById("tempo1");
const som1El = document.getElementById("som1");
const led1El = document.getElementById("led1");

const tempo2El = document.getElementById("tempo2");
const som2El = document.getElementById("som2");
const led2El = document.getElementById("led2");

// Canvas do Chart.js
const ctx = document.getElementById('chart').getContext('2d');

// Inicializa gráfico
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'TempoMinChegada P1', data: [], borderColor: 'blue', fill: false },
      { label: 'AtivarSom P1', data: [], borderColor: 'orange', fill: false },
      { label: 'AtivarLED P1', data: [], borderColor: 'green', fill: false },
      { label: 'TempoMinChegada P2', data: [], borderColor: 'darkblue', fill: false },
      { label: 'AtivarSom P2', data: [], borderColor: 'darkorange', fill: false },
      { label: 'AtivarLED P2', data: [], borderColor: 'darkgreen', fill: false }
    ]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { position: 'top' }, 
      title: { display: true, text: 'Thresholds das Paradas Inteligentes' } 
    },
    scales: { y: { beginAtZero: true } }
  }
});

// Função genérica para buscar feeds de uma parada
async function fetchParada(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return (data.feeds && data.feeds.length > 0) ? data.feeds : null;
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return null;
  }
}

// Função genérica para atualizar os elementos e datasets
function atualizarParada(feeds, elementos, indices) {
  const last = feeds[feeds.length - 1];
  elementos.tempo.textContent = last.field1 || 0;
  elementos.som.textContent = last.field2 || 0;
  elementos.led.textContent = last.field3 || 0;

  chart.data.datasets[indices.tempo].data = feeds.map(f => Number(f.field1) || 0);
  chart.data.datasets[indices.som].data = feeds.map(f => Number(f.field2) || 0);
  chart.data.datasets[indices.led].data = feeds.map(f => Number(f.field3) || 0);
}

// Atualiza valores e gráfico
async function atualizarDados() {
  const feeds1 = await fetchParada(URL_PARADA1);
  const feeds2 = await fetchParada(URL_PARADA2);

  if (feeds1) {
    atualizarParada(feeds1, 
      { tempo: tempo1El, som: som1El, led: led1El }, 
      { tempo: 0, som: 1, led: 2 }
    );
  }

  if (feeds2) {
    atualizarParada(feeds2, 
      { tempo: tempo2El, som: som2El, led: led2El }, 
      { tempo: 3, som: 4, led: 5 }
    );
  }

  // Atualiza labels usando os timestamps da primeira parada (ou segunda se quiser)
  if (feeds1 && feeds1.length > 0) {
    chart.data.labels = feeds1.map(f => 
      new Date(f.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  }

  chart.update("active");
}

// Atualiza a cada 4 segundos
atualizarDados();
setInterval(atualizarDados, 4000);
