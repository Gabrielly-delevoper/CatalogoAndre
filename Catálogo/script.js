const numeroWhats = "5521965134957";

// carrega carrinho salvo
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* =========================
   PRODUTOS (MANTÉM IGUAL)
========================= */
const produtos = [
    { id: 1, nome: "Essência Carioca", tamanho: "140x45cm", preco: 684.99, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Essência_Carioca_kvbiiq" },
    { id: 2, nome: "Alma do Rio", tamanho: "55x35cm", preco: 180.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Alma_do_Rio_eurfgj" },
    { id: 3, nome: "Navegantes", tamanho: "35x27cm", preco: 169.99, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Navegantes_e1fd8f" },
    { id: 4, nome: "Lunar Essence", tamanho: "140x45cm", preco: 570.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Lunar_Essence_lxfmpj" },
    { id: 5, nome: "Horizonte de Verão", tamanho: "55x35cm", preco: 340.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Horizonte_de_Verão_wzpsbw" },
    { id: 6, nome: "Refúgio de Verão", tamanho: "55x35cm", preco: 180.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Refúgio_do_Verão_xblizc" },
    { id: 7, nome: "Lagoa & Corcovado", tamanho: "1.00x35cm", preco: 450.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Lagoa_Corcovado_rt0ho7" },
    { id: 8, nome: "Liberdade", tamanho: "55x35cm", preco: 340.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Liberdade_em_Movimento_aezcdq" },
    { id: 10, nome: "Pão de Açúcar", tamanho: "35x27cm", preco: 105.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Pão_de_Áçucar_e7tf5h" },
    { id: 11, nome: "Pão de Açúcar - Verde", tamanho: "35x27cm", preco: 105.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Pão_de_Áçucar_-_Verde_aii4pl" },
    { id: 12, nome: "Pescador", tamanho: "55x35cm", preco: 175.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Travessia_jjnpbk" },
    { id: 13, nome: "Redentor ao Luar", tamanho: "55x35cm", preco: 175.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Redentor_ao_Luar_fh0mpn" },
    { id: 14, nome: "O Homem da maçã", tamanho: "55x35cm", preco: 199.99, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/O_Homem_da_Maça_idll9u" },
    { id: 15, nome: "Dualidade Natural", tamanho: "55x35x7cm", preco: 470.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Dualidade_Natural_qezodx" },
    { id: 16, nome: "Equilíbrio Azul", tamanho: "55x35cm", preco: 175.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Equilíbrio_Azul_wwyph3" },
    { id: 17, nome: "Folha Orgânica", tamanho: "1.00x35cm", preco: 330.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Folha_Orgânica_o8ekxx" },
    { id: 18, nome: "Jardim Rosé", tamanho: "55x35cm", preco: 510.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Jardim_Rosé_kn2eab" },
    { id: 19, nome: "Cristo Redentor", tamanho: "55x35cm", preco: 195.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/ChatGPT_Image_3_de_mai._de_2026_13_47_44_cnwudg" },
    { id: 20, nome: "Essência Luar - Marrom", tamanho: "140x40cm", preco: 570.00, img: "https://res.cloudinary.com/dqvahjwcb/image/upload/f_auto,q_auto/Lunar_Essence_1_vlztpb" }
];

/* =========================
   SALVAR CARRINHO
========================= */
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* =========================
   RENDERIZAR PRODUTOS
========================= */
function renderizarProdutos() {
    const container = document.getElementById("catalogo");

    container.innerHTML = produtos.map(produto => `
        <div class="produto-card">
            <div class="img-container">
                <img src="${produto.img}" alt="${produto.nome}">
            </div>
            <div class="info">
                <h3>${produto.nome}</h3>
                <p class="tamanho">Tamanho: ${produto.tamanho}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>

                <button class="btn-comprar" onclick="adicionar(${produto.id}, this)">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join("");
}

/* =========================
   ADICIONAR PRODUTO
========================= */
function adicionar(id, botao) {

    const produto = produtos.find(p => p.id === id);
    const existente = carrinho.find(item => item.id === id);

    if (existente) {
        existente.qtd += 1;
    } else {
        carrinho.push({ ...produto, qtd: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();

    // animação botão
    botao.classList.add("animando");
    setTimeout(() => botao.classList.remove("animando"), 300);

    mostrarToast("Adicionado ao carrinho 🛒");
}

/* =========================
   TOAST
========================= */
function mostrarToast(texto) {

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = texto;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("mostrar"), 50);

    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

/* =========================
   ATUALIZAR CARRINHO
========================= */
function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total-valor");

    const totalItens = carrinho.reduce((s, i) => s + i.qtd, 0);
    document.getElementById("contador").innerText = totalItens;

    lista.innerHTML = carrinho.map(item => `
        <li class="item-carrinho">
            <span>${item.nome} (${item.qtd}x)</span>
            <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
        </li>
    `).join("");

    const total = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
    totalEl.innerText = total.toFixed(2);
}

/* =========================
   ABRIR/FECHAR CARRINHO
========================= */
function toggleCarrinho() {

    const carrinhoEl = document.getElementById("carrinho");
    const overlay = document.getElementById("overlay");

    carrinhoEl.classList.toggle("aberto");
    overlay.classList.toggle("ativo");
}

/* =========================
   WHATSAPP
========================= */
function enviarWhatsApp() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio 🛒");
        return;
    }

    let msg = "✨ *Pedido - André Batista Decor*\n\n";

    carrinho.forEach((item, i) => {
        msg += `📌 ${i + 1}. ${item.nome}\n`;
        msg += `📏 ${item.tamanho}\n`;
        msg += `💰 R$ ${(item.preco * item.qtd).toFixed(2)}\n\n`;
    });

    const total = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);

    msg += `🧾 *Total: R$ ${total.toFixed(2)}*\n\n`;
    msg += "Gostaria de finalizar o pedido 😊";

    window.open(
        `https://wa.me/${numeroWhats}?text=${encodeURIComponent(msg)}`,
        "_blank"
    );
}

/* =========================
   INICIAR
========================= */
renderizarProdutos();
atualizarCarrinho();
