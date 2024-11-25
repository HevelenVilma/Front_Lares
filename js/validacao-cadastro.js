document.addEventListener('DOMContentLoaded', () => {
    const senha = document.querySelector('#senha');
    const confirmacao = document.querySelector('#confirma-senha');
    const email = document.querySelector('#email');
    const dataNascimento = document.getElementById('data-nascimento');
    const erroIdade = document.getElementById('erro-idade');
    const tipoCadastro = document.getElementById('tipo-cadastro');
    const camposPessoa = document.getElementById('campos-pessoa');
    const camposOng = document.getElementById('campos-ong');
    const cnpj = document.getElementById('cnpj');
    const botao = document.querySelector('#botao');

    let listaEmails = JSON.parse(localStorage.getItem('listaEmails')) || []; // Recupera a lista de e-mails salvos

    // Alterna entre os campos de cadastro de Pessoa Física e ONG
    tipoCadastro.addEventListener('change', () => {
        if (tipoCadastro.value === 'ong') {
            camposPessoa.style.display = 'none';
            camposOng.style.display = 'block';
        } else {
            camposPessoa.style.display = 'block';
            camposOng.style.display = 'none';
        }
    });

    // Verifica as validações no clique do botão
    botao.addEventListener('click', (evento) => {
        let formularioValido = true;

        // Verifica confirmação da senha
        if (!confirmarSenha(senha, confirmacao)) {
            formularioValido = false;
            alert('A confirmação não é igual à senha');
        }

        // Verifica idade mínima
        if (!verificarIdade(dataNascimento.value)) {
            formularioValido = false;
            erroIdade.style.display = 'block';
        } else {
            erroIdade.style.display = 'none';
        }

        // Validação do CNPJ caso seja uma ONG
        if (tipoCadastro.value === 'ong' && !validarCNPJ(cnpj.value)) {
            formularioValido = false;
            alert('CNPJ inválido. Por favor, insira um CNPJ válido.');
        }

        // Verifica e-mail duplicado
        if (emailJaCadastrado(email.value, listaEmails)) {
            formularioValido = false;
            alert('Este e-mail já está cadastrado.');
        }

        // Salva o cadastro se o formulário for válido
        if (formularioValido) {
            guardarCadastro(email, senha, listaEmails);
        } else {
            evento.preventDefault(); // Impede o envio se alguma validação falhar
        }
    });

    function confirmarSenha(senha, confirmacao) {
        return senha.value === confirmacao.value;
    }

    function verificarIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade >= 18;
    }

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove pontuações do CNPJ

        if (cnpj.length !== 14) return false;

        // Cálculo do dígito verificador
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado === parseInt(digitos.charAt(1));
    }

    function emailJaCadastrado(email, listaEmails) {
        return listaEmails.includes(email);
    }

    function guardarCadastro(email, senha, listaEmails) {
        listaEmails.push(email.value);
        localStorage.setItem('listaEmails', JSON.stringify(listaEmails)); // Armazena lista atualizada no localStorage
        localStorage.setItem('email', email.value);
        localStorage.setItem('senha', senha.value); // Evite armazenar senhas em texto simples no localStorage em produção
        alert('Cadastro realizado com sucesso!');
    }
});
