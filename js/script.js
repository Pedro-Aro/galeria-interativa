
const fotos = document.querySelectorAll(".foto");
const botoesFiltro = document.querySelectorAll(".filtro");
const galeria = document.querySelector(".galeria");
const quantidade = document.querySelector("#quantidade");

const modal = document.querySelector("#modal");
const imagemModal = document.querySelector("#imagem-modal");
const tituloModal = document.querySelector("#titulo-modal");
const descricaoModal = document.querySelector("#descricao-modal");
const categoriaModal = document.querySelector("#categoria-modal");
const localModal = document.querySelector("#local-modal");
const contador = document.querySelector("#contador");

const botaoFechar = document.querySelector("#fechar");
const botaoAnterior = document.querySelector("#anterior");
const botaoProximo = document.querySelector("#proximo");

let fotoAtual = 0;
let fotosVisiveis = [];

function atualizarFotosVisiveis() {
    fotosVisiveis = Array.from(fotos).filter(function(foto) {
        return !foto.classList.contains("oculta");
    });

    quantidade.textContent =
        fotosVisiveis.length +
        (fotosVisiveis.length === 1
            ? " fotografia encontrada"
            : " fotografias encontradas");
}

function abrirModal(foto) {
    atualizarFotosVisiveis();

    fotoAtual = fotosVisiveis.indexOf(foto);

    if (fotoAtual === -1) {
        return;
    }

    atualizarModal();

    modal.classList.add("aberto");
    document.body.style.overflow = "hidden";
}

function atualizarModal() {
    const foto = fotosVisiveis[fotoAtual];

    if (!foto) {
        fecharModal();
        return;
    }

    const imagem = foto.querySelector("img");

    imagemModal.src = imagem.src;
    imagemModal.alt = imagem.alt;

    tituloModal.textContent = foto.dataset.titulo;
    descricaoModal.textContent = foto.dataset.descricao;
    categoriaModal.textContent = foto.dataset.categoria;
    localModal.textContent = foto.dataset.local;

    contador.textContent =
        (fotoAtual + 1) + " de " + fotosVisiveis.length;
}

function fecharModal() {
    modal.classList.remove("aberto");
    document.body.style.overflow = "";
}

function proximaFoto() {
    if (fotosVisiveis.length === 0) {
        return;
    }

    fotoAtual++;

    if (fotoAtual >= fotosVisiveis.length) {
        fotoAtual = 0;
    }

    atualizarModal();
}

function fotoAnterior() {
    if (fotosVisiveis.length === 0) {
        return;
    }

    fotoAtual--;

    if (fotoAtual < 0) {
        fotoAtual = fotosVisiveis.length - 1;
    }

    atualizarModal();
}

// Abrir o modal ao clicar em uma fotografia

fotos.forEach(function(foto) {
    foto.addEventListener("click", function() {
        abrirModal(foto);
    });
});

// Fechar o modal

botaoFechar.addEventListener("click", fecharModal);

modal.addEventListener("click", function(evento) {
    if (evento.target === modal) {
        fecharModal();
    }
});

// Navegação entre as fotografias

botaoProximo.addEventListener("click", proximaFoto);
botaoAnterior.addEventListener("click", fotoAnterior);

// Fechar com a tecla ESC

document.addEventListener("keydown", function(evento) {
    if (!modal.classList.contains("aberto")) {
        return;
    }

    if (evento.key === "Escape") {
        fecharModal();
    }

    if (evento.key === "ArrowRight") {
        proximaFoto();
    }

    if (evento.key === "ArrowLeft") {
        fotoAnterior();
    }
});

// Filtro por categorias

botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const categoria = botao.dataset.filtro;

        botoesFiltro.forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        galeria.classList.toggle("filtrada", categoria !== "todos");

        fotos.forEach(function(foto) {
            if (
                categoria === "todos" ||
                foto.dataset.categoria === categoria
            ) {
                foto.classList.remove("oculta");
            } else {
                foto.classList.add("oculta");
            }
        });

        galeria.style.animation = "none";
        galeria.offsetHeight;
        galeria.style.animation = "";

        atualizarFotosVisiveis();
    });
});

// Inicialização

atualizarFotosVisiveis();
