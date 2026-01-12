const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");
const demoInput = document.getElementById("demoInput");

let textoParaFalar = "";

// 📚 BANCO DE MEDICAMENTOS
const medicamentos = {
  dipirona: {
    uso: "Alívio de dor e febre.",
    comoUsar: "Tomar conforme orientação médica.",
    aviso: "Evitar uso excessivo."
  },
  paracetamol: {
    uso: "Dor e febre.",
    comoUsar: "Não exceder a dose diária.",
    aviso: "Pode causar danos ao fígado."
  },
  omeprazol: {
    uso: "Refluxo e gastrite.",
    comoUsar: "Tomar em jejum.",
    aviso: "Uso contínuo apenas com orientação."
  },
  tropinal: {
    uso: "Cólicas e dores espasmódicas.",
    comoUsar: "Usar conforme orientação.",
    aviso: "Pode causar efeitos colaterais."
  },
  tansulosina: {
    uso: "Auxilia na eliminação de cálculos renais.",
    comoUsar: "Uma vez ao dia.",
    aviso: "Pode causar tontura."
  },
  propranolol: {
    uso: "Controle da pressão arterial.",
    comoUsar: "Uso contínuo.",
    aviso: "Não interromper abruptamente."
  },
  loperamida: {
    uso: "Diarreia aguda.",
    comoUsar: "Uso pontual.",
    aviso: "Não usar em infecções."
  },
  ciclobenzaprina: {
    uso: "Relaxante muscular.",
    comoUsar: "Uso curto.",
    aviso: "Causa sonolência."
  },
  nimesulida: {
    uso: "Dor e inflamação.",
    comoUsar: "Menor dose eficaz.",
    aviso: "Risco hepático."
  },
  amoxicilina: {
    uso: "Infecções bacterianas.",
    comoUsar: "Completar o tratamento.",
    aviso: "Somente com prescrição."
  }
};

// 🎥 ATIVA A CÂMERA — FORMA MAIS COMPATÍVEL (ESSA FUNCIONA)
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment"
  }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  alert("Não foi possível acessar a câmera. Use HTTPS.");
  console.error(err);
});

// 📷 DEMONSTRAÇÃO (TEXTO)
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
  if (!textoParaFalar) {
    alert("Nenhuma informação disponível.");
    return;
  }

  const msg = new SpeechSynthesisUtterance(textoParaFalar);
  msg.lang = "pt-BR";
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
}
