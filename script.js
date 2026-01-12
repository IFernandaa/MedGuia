const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");
const demoInput = document.getElementById("demoInput");

let textoParaFalar = "";

// ATIVAR CÂMERA
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  alert("Erro ao acessar a câmera");
});

// BANCO DE MEDICAMENTOS
const medicamentos = {
  dipirona: {
    uso: "Alívio de dor e febre",
    comoUsar: "Tomar conforme orientação médica",
    aviso: "Evitar uso excessivo"
  },
  paracetamol: {
    uso: "Dor e febre",
    comoUsar: "Não ultrapassar a dose diária",
    aviso: "Pode causar danos ao fígado"
  },
  omeprazol: {
    uso: "Problemas gástricos",
    comoUsar: "Tomar em jejum",
    aviso: "Uso contínuo apenas com orientação"
  },
  ibuprofeno: {
    uso: "Dor e inflamação",
    comoUsar: "Após as refeições",
    aviso: "Evitar em caso de gastrite"
  },
  losartana: {
    uso: "Controle da pressão arterial",
    comoUsar: "Tomar diariamente no mesmo horário",
    aviso: "Não interromper sem orientação médica"
  }
};

// CAPTURA DA IMAGEM
function capturarImagem() {
  // MODO DEMONSTRAÇÃO
  const textoDigitado = demoInput.value.toLowerCase();
  if (textoDigitado !== "") {
    analisarTexto(textoDigitado);
    return;
  }

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

// ANALISAR TEXTO
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

// VOZ
function falarTexto() {
  if (textoParaFalar === "") {
    alert("Nenhuma informação para ler.");
    return;
  }

  const msg = new SpeechSynthesisUtterance(textoParaFalar);
  msg.lang = "pt-BR";
  msg.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}
