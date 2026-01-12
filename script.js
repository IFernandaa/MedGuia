const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");

let textoParaFalar = "";

// Ativar câmera traseira
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
})

// Banco simples de medicamentos
const medicamentos = {
  dipirona: {
    uso: "Alívio de dor e febre",
    comoUsar: "Tomar conforme orientação médica",
    aviso: "Evitar uso excessivo"
  },
  paracetamol: {
    uso: "Dor e febre",
    comoUsar: "Não ultrapassar a dose diária",
    aviso: "Evitar uso prolongado"
  },
  omeprazol: {
    uso: "Problemas gástricos",
    comoUsar: "Tomar em jejum",
    aviso: "Uso contínuo apenas com orientação"
  }
};

function capturarImagem() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  resultado.innerHTML = "🔍 Analisando imagem...";

  Tesseract.recognize(canvas, "por")
    .then(({ data: { text } }) => {
      analisarTexto(text.toLowerCase());
    });
}

function analisarTexto(texto) {
  for (let nome in medicamentos) {
    if (texto.includes(nome)) {
      const med = medicamentos[nome];

      textoParaFalar = `
Medicamento ${nome}.
Uso: ${med.uso}.
Como usar: ${med.comoUsar}.
Aviso: ${med.aviso}.
      `;

      resultado.innerHTML = `
        <h2>${nome.toUpperCase()}</h2>
        <p><b>Uso:</b> ${med.uso}</p>
        <p><b>Como usar:</b> ${med.comoUsar}</p>
        <p><b>Aviso:</b> ${med.aviso}</p>
      `;
      return;
    }
  }

  resultado.innerHTML = "❌ Medicamento não identificado.";
}

function falarTexto() {
  if (!textoParaFalar) return;

  const fala = new SpeechSynthesisUtterance(textoParaFalar);
  fala.lang = "pt-BR";
  window.speechSynthesis.speak(fala);
}
