const numeroWhats = "5521965134957";

/* =========================
CARRINHO
========================= */
let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

/* =========================
PRODUTOS
========================= */
const produtos = [

    {
        id: 1,
        nome: "Essência Carioca",
        tamanho: "140x45cm",
        preco: 684.99,
        img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Essência_Carioca_kvbiiq"
    },

    {
        id: 2,
        nome: "Alma do Rio",
        tamanho: "55x35cm",
        preco: 180.00,
        img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Alma_do_Rio_eurfgj"
    },

    {
        id: 3,
        nome: "Navegantes",
        tamanho: "35x27cm",
        preco: 169.99,
        img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Navegantes_e1fd8f"
    }

];

/* =========================
SALVAR
========================= */
function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

/* =========================
RENDERIZAR
========================= */
function renderizarProdutos() {

    const catalogo =
    document.getElementById("catalogo");

    catalogo.innerHTML =
    produtos.map(produto => `

        <div class="produto-card">

            <div class="img-container">

                <img
                    src="${produto.img}"
                    alt="${produto.nome}"
                >

            </div>

            <div class="info">

                <h3>${produto.nome}</h3>

                <p class="tamanho">
                    Tamanho: ${produto.tamanho}
                </p>

                <p class="preco">
                    R$ ${produto.preco.toFixed(2)}
                </p>

                <button
                    class="btn-comprar"
                    onclick="adicionarAoCarrinho(${produto.id}, this)"
                >
                    Adicionar ao Carrinho
                </button>

            </div>

        </div>

    `).join("");

}

/* =========================
ADICIONAR
========================= */
function adicionarAoCarrinho(id, botao) {

    const produto =
    produtos.find(p => p.id === id);

    const existente =
    carrinho.find(item => item.id === id);

    if (existente) {

        existente.qtd += 1;

    } else {

        carrinho.push({
            ...produto,
            qtd: 1
        });

    }

    salvarCarrinho();

    atualizarCarrinho();

    botao.classList.add("btn-adicionado");

    setTimeout(() => {

        botao.classList.remove(
            "btn-adicionado"
        );

    }, 500);

    const contador =
    document.getElementById("contador");

    contador.classList.add(
        "contador-animado"
    );

    setTimeout(() => {

        contador.classList.remove(
            "contador-animado"
        );

    }, 450);

    mostrarToast(
        "Produto adicionado ao carrinho 🛒"
    );

}

/* =========================
ATUALIZAR CARRINHO
========================= */
function atualizarCarrinho() {

    const lista =
    document.getElementById("lista-carrinho");

    const totalValor =
    document.getElementById("total-valor");

    const contador =
    document.getElementById("contador");

    const totalItens =
    carrinho.reduce(
        (soma, item) => soma + item.qtd,
        0
    );

    contador.innerText = totalItens;

    lista.innerHTML =
    carrinho.map(item => `

        <li class="item-carrinho">

            <div>

                <strong>
                    ${item.nome}
                </strong>

                <p>
                    ${item.qtd}x
                    •
                    R$ ${item.preco.toFixed(2)}
                </p>

            </div>

            <span>
                R$ ${(item.preco * item.qtd).toFixed(2)}
            </span>

        </li>

    `).join("");

    const total =
    carrinho.reduce(
        (soma, item) =>
        soma + (item.preco * item.qtd),
        0
    );

    totalValor.innerText =
    total.toFixed(2);

}

/* =========================
ABRIR CARRINHO
========================= */
function toggleCarrinho() {

    const carrinhoEl =
    document.getElementById("carrinho");

    const overlay =
    document.getElementById("overlay");

    carrinhoEl.classList.toggle("aberto");

    overlay.classList.toggle("ativo");

}

/* =========================
TOAST
========================= */
function mostrarToast(texto) {

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = texto;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("mostrar");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2200);

}

/* =========================
WHATSAPP
========================= */
function enviarWhatsApp() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio 🛒"
        );

        return;

    }

    let mensagem =
    "✨ *Pedido - André Batista Decor*%0A%0A";

    carrinho.forEach((item, index) => {

        mensagem +=
        `📌 *${index + 1}. ${item.nome}*%0A`;

        mensagem +=
        `📏 ${item.tamanho}%0A`;

        mensagem +=
        `🛍️ Quantidade: ${item.qtd}%0A`;

        mensagem +=
        `💰 R$ ${(item.preco * item.qtd).toFixed(2)}%0A%0A`;

    });

    const total =
    carrinho.reduce(
        (soma, item) =>
        soma + (item.preco * item.qtd),
        0
    );

    mensagem +=
    `🧾 *Total: R$ ${total.toFixed(2)}*%0A%0A`;

    mensagem +=
    "Gostaria de finalizar meu pedido 😊";

    window.open(
        `https://wa.me/${numeroWhats}?text=${mensagem}`,
        "_blank"
    );

}

/* =========================
INICIAR
========================= */
renderizarProdutos();

atualizarCarrinho();
