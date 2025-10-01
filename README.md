📊 Parada Inteligente - Dashboard

Este projeto é um protótipo de sistema de monitoramento em tempo real para uma parada de ônibus inteligente.
Ele coleta dados de botões físicos (para deficientes visuais e físicos) e envia para o ThingSpeak, de onde os dados são consumidos e exibidos em um dashboard interativo com Chart.js.

🚀 Funcionalidades

Envio de eventos do ESP32 para a nuvem via ThingSpeak.

Leitura de thresholds configurados na nuvem (tempo de chegada, som, LED).

Dashboard web que mostra:

📌 Cliques totais nos botões (deficiente visual e físico).

⏰ Cliques por horário em gráfico de linha.

📈 Atualização automática em tempo real (a cada 5s).

Interface responsiva e simples para visualização rápida.

🛠️ Tecnologias Utilizadas
🔹 Hardware & IoT

ESP32 (Wokwi) – simulação e envio de dados.

WiFi + HTTPClient – comunicação com ThingSpeak.

ArduinoJson – parse de dados JSON via GET.

🔹 Backend/Nuvem

ThingSpeak – armazenamento de logs e thresholds.

Canal 3096316 → Logs (cliques).

Canal 3096396 → Thresholds (tempo, som, LED).

🔹 Frontend

HTML + CSS + JavaScript

Chart.js – gráficos dinâmicos.

Fetch API – consumo de dados do ThingSpeak.

📊 Exemplo de Dashboard

Gráfico de Barras → Cliques totais por tipo de botão.

Gráfico de Linha → Cliques por horário (últimas leituras).