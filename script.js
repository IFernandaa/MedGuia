const video = document.getElementById("camera");
const resultado = document.getElementById("resultado");
const demoInput = document.getElementById("demoInput");

let textoParaFalar = "";

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
    uso: "Pressão alta",
    comoUsar: "Tomar diariamente",
    aviso: "Não interromper sem orientação médica"
  }
};

// 🔘 ATIVAR CÂMERA (COM CLIQUE)
function ativarCamera() {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(() => {
    alert("Não foi possível acessar a câmera");
  });
}

// 📷 CAPTURAR / DEMO
function capturarImagem() {
  const texto = demoInput.value.toLowerCase();

  if (texto !== "") {
    analisarTexto(texto);
  } else {
    resultado.innerHTML = "Digite o nome do remédio para demonstração.";
  }
}

// 🔍 ANALISAR
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
