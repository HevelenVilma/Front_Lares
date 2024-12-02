document.getElementById("botao-filtrar").addEventListener("click", () => {
    const porteInput = document.getElementById("filtro-porte").value.toLowerCase();
    const tipoInput = document.getElementById("filtro-tipo").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardPorte = card.querySelector(".card__porte")?.textContent.toLowerCase() || "";
        const cardTipo = card.querySelector(".card__tipo")?.textContent.toLowerCase() || "";  // Aqui você pega o tipo do animal

        // Lógica de filtragem para cada campo
        const matchPorte = !porteInput || cardPorte.includes(porteInput);
        const matchTipo = !tipoInput || cardTipo.includes(tipoInput);

        // Mostra ou esconde o card com base nos filtros
        if (matchPorte && matchTipo) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const animaisCadastrados = JSON.parse(localStorage.getItem('animaisCadastrados')) || [];
    const containerCards = document.querySelector('.home__cards');

    animaisCadastrados.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="card__img" src="${animal.imagem || '/img/placeholder.png'}" alt="Imagem do animal ${animal.nome}">
            <div class="card__descricao">
                <h4 class="card__nome">${animal.nome}</h4>
                <p class="card__caracteristicas">${animal.idade}</p>
                <p class="card__porte">Porte ${animal.porte}</p>
                <p class="card__tipo">${animal.tipo}</p>
                <p class="card__caracteristicas">${animal.caracteristicas}</p>
                <p class="card__localizacao">${animal.localizacao}</p>
                <a class="card__contato" href="/contato.html">
                    <img class="card__contato-icone" src="/img/ícone mensagem.png" alt="Ícone Mensagem">
                    <p class="card__contato-texto">Falar com responsável</p>
                </a>
            </div>
        `;
        containerCards.appendChild(card);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const animal = params.get("animal");
    if (animal) {
        console.log(`Você selecionou o animal: ${animal}`);
    }
});

