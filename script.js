<script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js"></script>

<script>
const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");
const demoInput = document.getElementById("demoInput");

let textoParaFalar = "";

// 📚 BANCO DE MEDICAMENTOS
const medicamentos = {
  dipirona: {
    uso: "Alívio de dor e febre.",
    comoUsar: "Tomar conforme orientação médica ou farmacêutica.",
    aviso: "Evitar uso excessivo e em caso de alergia."
  },
  paracetamol: {
    uso: "Tratamento de dor leve a moderada e febre.",
    comoUsar: "Não ultrapassar a dose diária recomendada.",
    aviso: "Uso excessivo pode causar danos ao fígado."
  },
  omeprazol: {
    uso: "Tratamento de refluxo, gastrite e úlcera.",
    comoUsar: "Tomar em jejum.",
    aviso: "Uso prolongado apenas com orientação médica."
  },
  tropinal: {
    uso: "Alívio de dores espasmódicas e cólicas.",
    comoUsar: "Usar conforme orientação profissional.",
    aviso: "Pode causar efeitos colaterais."
  },
  tansulosina: {
    uso: "Auxilia no fluxo urinário e na eliminação de cálculos renais.",
    comoUsar: "Tomar uma vez ao dia.",
    aviso: "Pode causar tontura."
  },
  propranolol: {
    uso: "Controle da pressão arterial e arritmias.",
    comoUsar: "Usar conforme prescrição médica.",
    aviso: "Não interromper abruptamente."
  },
  loperamida: {
    uso: "Tratamento de diarreia aguda.",
    comoUsar: "Usar conforme orientação.",
    aviso: "Não usar em infecção intestinal."
  },
  ciclobenzaprina: {
    uso: "Relaxante muscular.",
    comoUsar: "Uso por curto período.",
    aviso: "Pode causar sonolência."
  },
  nimesulida: {
    uso: "Redução de dor, inflamação e febre.",
    comoUsar: "Menor dose eficaz.",
    aviso: "Cuidado em problemas hepáticos."
  },
  amoxicilina: {
    uso: "Tratamento de infecções bacterianas.",
    comoUsar: "Completar o tratamento.",
    aviso: "Uso apenas com prescrição médica."
  }
};

// 🎥 ATIVAR CÂMERA (MELHOR QUALIDADE)
function ativarCamera() {
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    }
  })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    alert("Erro ao acessar a câmera: " + err);
  });
}

// 📷 CAPTURAR IMAGEM OU TEXTO
function capturarImagem() {
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

  // 🧠 PRÉ-PROCESSAMENTO (CONTRASTE + CINZA)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const gray = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
    const contrast = gray > 150 ? 255 : 0;
    imgData.data[i] = contrast;
    imgData.data[i+1] = contrast;
    imgData.data[i+2] = contrast;
  }
  ctx.putImageData(imgData, 0, 0);

  resultado.innerHTML = "🔍 Analisando embalagem...";

  Tesseract.recognize(canvas, "por")
    .then(({ data: { text } }) => {
      analisarTexto(text.toLowerCase());
    });
}

// 🔍 ANALISAR TEXTO
function analisarTexto(texto) {
  for (let nome in medicamentos) {
    if (texto.includes(nome)) {
      mostrarMedicamento(nome);
      return;
    }
  }

  resultado.innerHTML = `
    ❌ Medicamento não identificado.<br>
    👉 Aproxime a câmera ou use o modo manual.
  `;
}

// 📄 EXIBIR MEDICAMENTO
function mostrarMedicamento(nome) {
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
}

// 🔊 VOZ
function falarTexto() {
  if (!textoParaFalar) {
    alert("Nenhuma informação disponível.");
    return;
  }

  const msg = new SpeechSynthesisUtterance(textoParaFalar);
  msg.lang = "pt-BR";
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
}
</script>
