document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let dataNascimento = document.getElementById('dataNascimento').value;
    let sexo = document.querySelector('input[name="sexo"]:checked');
    let estadoCivil = document.getElementById('estadoCivil').value;
    let interesses = document.querySelectorAll('input[name="interesse"]:checked');

    let message = '';
    let valid = true;

    // Validação do nome
    if (nome.length < 15) {
        message = 'Nome completo deve ter no mínimo 15 caracteres.';
        valid = false;
        document.getElementById('nome').focus();
    }

    // Validação do email
    if (valid && (email.length < 10 || !email.includes('@') || !email.includes('.'))) {
        message = 'E-mail deve ter pelo menos 10 caracteres e conter @ e .';
        valid = false;
        document.getElementById('email').focus();
    }

    // Validação da data de nascimento
    let birthDate = new Date(dataNascimento);
    let today = new Date();
    if (valid && (!birthDate || birthDate > today)) {
        message = 'Data de nascimento inválida.';
        valid = false;
        document.getElementById('dataNascimento').focus();
    }

    // Validação do estado civil e idade
    if (valid && estadoCivil === 'solteiro') {
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 15) {
            message = 'Para solteiros, idade deve ser superior a 15 anos.';
            valid = false;
            document.getElementById('dataNascimento').focus();
        }
    }

    // Validação das áreas de interesse
    if (valid && interesses.length === 0) {
        message = 'Selecione pelo menos uma área de interesse.';
        valid = false;
        document.querySelector('input[name="interesse"]').focus();
    }

    // Mostrar mensagem de sucesso ou erro
    let messageDiv = document.getElementById('message');
    if (valid) {
        message = 'Dados enviados com sucesso!';
        messageDiv.className = 'success';
    } else {
        messageDiv.className = 'error';
    }

    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
});
