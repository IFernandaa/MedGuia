const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");
const demoInput = document.getElementById("demoInput");

let textoParaFalar = "";

// BANCO DE MEDICAMENTOS
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
    uso: "Tratamento de problemas gástricos, como refluxo e gastrite.",
    comoUsar: "Tomar em jejum, conforme prescrição médica.",
    aviso: "Uso contínuo apenas com orientação médica."
  },
  tropinal: {
    uso: "Alívio de dores espasmódicas e cólicas.",
    comoUsar: "Usar conforme orientação médica ou farmacêutica.",
    aviso: "Pode causar efeitos colaterais."
  },
  tansulosina: {
    uso: "Auxilia na eliminação de cálculos renais.",
    comoUsar: "Tomar uma vez ao dia.",
    aviso: "Pode causar tontura."
  },
  propranolol: {
    uso: "Controle da pressão arterial.",
    comoUsar: "Usar conforme prescrição médica.",
    aviso: "Não interromper sem orientação."
  },
  loperamida: {
    uso: "Tratamento de diarreia aguda.",
    comoUsar: "Usar conforme orientação.",
    aviso: "Não usar em infecções intestinais."
  },
  ciclobenzaprina: {
    uso: "Relaxante muscular.",
    comoUsar: "Uso por curto período.",
    aviso: "Pode causar sonolência."
  },
  nimesulida: {
    uso: "Redução de dor e inflamação.",
    comoUsar: "Menor dose eficaz.",
    aviso: "Cuidado com fígado."
  },
  amoxicilina: {
    uso: "Tratamento de infecções bacterianas.",
    comoUsar: "Completar o tratamento.",
    aviso: "Uso com prescrição médica."
  }
};

// 🔘 ATIVAR CÂMERA (COM CLIQUE — COMO FUNCIONAVA)
function ativarCamera() {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    alert("Erro ao acessar a câmera: " + err);
  });
}

// 📷 DEMONSTRAÇÃO
function capturarImagem() {
  const texto = demoInput.value.toLowerCase();

  if (texto !== "") {
    analisarTexto(texto);
  } else {
    resultado.innerHTML = "Digite o nome do remédio para demonstração.";
  }
}

// 🔍 ANALISAR TEXTO
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

// 🔊 VOZ
function falarTexto() {
  if (textoParaFalar === "") {
    alert("Nenhuma informação para ler.");
    return;
  }

  const msg = new SpeechSynthesisUtterance(textoParaFalar);
  msg.lang = "pt-BR";
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
}
