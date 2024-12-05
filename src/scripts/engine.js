// Seleciona todas as teclas do piano
const pianoKeys = document.querySelectorAll(".piano-keys .key");

// Seleciona o controle deslizante de volume
const volumeSlider = document.getElementById("volume");

// Seleciona o toggle para exibir/ocultar as letras
const keysCheck = document.querySelector(".keys-check input");

// Variável para armazenar instâncias de áudio e o volume global
const audioInstances = {};
let globalVolume = 0.5; // Volume inicial (de 0 a 1)

// Cria instâncias de áudio para todas as teclas
pianoKeys.forEach((key) => {
    const keyName = key.dataset.key; // Nome da tecla (ex.: 'a', 's', etc.)
    audioInstances[keyName] = new Audio(`tunes/${keyName}.wav`); // Cria uma instância para cada tecla
    audioInstances[keyName].volume = globalVolume; // Define o volume inicial
});

// Função para tocar o som
const playTune = (key) => {
    const audio = audioInstances[key]; // Recupera a instância de áudio da tecla
    if (audio) {
        audio.currentTime = 0; // Reinicia o som antes de tocar
        audio.play().catch((error) => {
            console.error(`Erro ao reproduzir o áudio para a tecla "${key}":`, error);
        });

        // Adiciona animação à tecla clicada
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        if (clickedKey) {
            clickedKey.classList.add("active");
            setTimeout(() => {
                clickedKey.classList.remove("active");
            }, 150);
        }
    } else {
        console.error(`Tecla "${key}" não encontrada.`);
    }
};

// Adiciona eventos de clique a cada tecla
pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// Adiciona evento de teclado para reproduzir som ao pressionar teclas
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase(); // Normaliza a tecla para minúscula
    if (audioInstances[key]) {
        playTune(key);
    } else {
        console.error(`Tecla "${key}" não mapeada.`);
    }
});

// Função para ajustar o volume
const handleVolume = (e) => {
    globalVolume = parseFloat(e.target.value); // Atualiza o volume global (0 a 1)
    Object.values(audioInstances).forEach((audio) => {
        audio.volume = globalVolume; // Atualiza o volume de todas as instâncias
    });
    console.log(`Volume ajustado para: ${globalVolume}`);
};

// Função para exibir/ocultar as letras das teclas
const toggleLetters = () => {
    pianoKeys.forEach((key) => {
        key.classList.toggle("no-letters"); // Alterna a classe 'no-letters' para cada tecla
    });
};

// Adiciona evento para o controle deslizante de volume
volumeSlider.addEventListener("input", handleVolume);

// Adiciona evento para o toggle das letras
keysCheck.addEventListener("change", toggleLetters);
