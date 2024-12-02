// Função para mostrar a imagem no formulário e no cabeçalho
function mostrarImagem(event) {
    const imagemPerfil = document.getElementById('perfilImagem'); // Foto no formulário
    const imagemCabecalho = document.querySelector('.cabecalho__perfil-usuario'); // Foto no cabeçalho
    const arquivo = event.target.files[0];

    if (!arquivo) {
        alert("Nenhuma imagem selecionada!");
        return;
    }

    if (!arquivo.type.startsWith('image/')) {
        alert("Por favor, selecione um arquivo de imagem válido.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const imagemURL = e.target.result;

        // Atualiza as imagens no formulário e no cabeçalho
        imagemPerfil.src = imagemURL;
        imagemCabecalho.src = imagemURL;

        // Salva a imagem no LocalStorage
        localStorage.setItem('perfilImagem', imagemURL);
    };

    reader.onerror = function() {
        alert("Erro ao carregar a imagem. Tente novamente.");
    };

    reader.readAsDataURL(arquivo);
}

// Função para carregar a imagem do LocalStorage ao iniciar a página
function carregarImagem() {
    const imagemPerfil = document.getElementById('perfilImagem');
    const imagemCabecalho = document.querySelector('.cabecalho__perfil-usuario');
    const imagemSalva = localStorage.getItem('perfilImagem');

    if (imagemSalva) {
        // Aplica a imagem salva no LocalStorage às duas áreas
        imagemPerfil.src = imagemSalva;
        imagemCabecalho.src = imagemSalva;
    }
}

// Chama a função carregarImagem ao carregar a página
document.addEventListener('DOMContentLoaded', carregarImagem);

// Função para cadastrar um novo animal
let animaisCadastrados = JSON.parse(localStorage.getItem('animaisCadastrados')) || [];

function cadastrarAnimal() {
    const nome = document.getElementById('nomeAnimal').value;
    const idade = document.getElementById('idadeAnimal').value;
    const porte = document.getElementById('porteAnimal').value;
    const tipo = document.getElementById('tipoAnimal').value;
    const caracteristicas = document.getElementById('caracteristicasAnimal').value;
    const localizacao = document.getElementById('localizacaoAnimal').value;
    const imagemInput = document.getElementById('imagemAnimal');
    
    // Valida se todos os campos obrigatórios estão preenchidos
    if (!nome || !idade || !porte || !tipo || !localizacao) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    if (!imagemInput.files || imagemInput.files.length === 0) {
        alert('Adicione uma imagem do animal!');
        return;
    }

    const arquivo = imagemInput.files[0];
    if (!arquivo.type.startsWith('image/')) {
        alert('Por favor, envie um arquivo de imagem válido.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const imagemBase64 = e.target.result; // Base64 da imagem
        const novoAnimal = {
            nome,
            idade,
            porte,
            tipo,
            caracteristicas,
            localizacao,
            imagem: imagemBase64 // Salva a imagem em base64
        };

        // Adiciona o novo animal à lista de animais cadastrados
        animaisCadastrados.push(novoAnimal);

        // Salva a lista de animais no localStorage
        localStorage.setItem('animaisCadastrados', JSON.stringify(animaisCadastrados));

        alert('Animal cadastrado com sucesso!');
        document.getElementById('formCadastroAnimal').reset();
        exibirAnimais(); // Atualiza a lista de animais exibida
    };

    reader.onerror = function() {
        alert('Erro ao processar a imagem. Tente novamente.');
    };

    reader.readAsDataURL(arquivo); // Converte o arquivo para base64
}

// Função para exibir os animais cadastrados
function exibirAnimais() {
    const listaAnimais = document.getElementById('listaAnimais');
    listaAnimais.innerHTML = ''; // Limpa a lista de animais

    animaisCadastrados.forEach((animal) => {
        const item = document.createElement('div');
        item.classList.add('animal-item');
        item.innerHTML = `
            <img src="${animal.imagem}" alt="${animal.nome}" class="animal-imagem">
            <h3>${animal.nome}</h3>
            <p>Idade: ${animal.idade}</p>
            <p>Porte: ${animal.porte}</p>
            <p>Tipo: ${animal.tipo}</p>
            <p>Localização: ${animal.localizacao}</p>
            <p>${animal.caracteristicas}</p>
        `;
        listaAnimais.appendChild(item);
    });
}

// Chama a função para exibir os animais cadastrados ao carregar a página
document.addEventListener('DOMContentLoaded', exibirAnimais);

// Função para mostrar a imagem no preview ao selecionar no formulário
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = event.target.closest('.perfil__foto').querySelector('img');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
