document.addEventListener("DOMContentLoaded", function () {
  const btnContainer = document.querySelector('.btn-container');
  let titleOrcamento = document.getElementById('title-orcamento');
  let titleServiceOrcamento = document.getElementById('title-service-orcamento2');

  let userChoices = {
    'Tipo de Empresa': '',
    'Tipo de Residência': '',
    'Meio de Deslocamento': '',
    'Mercadoria comercializada': '',
    'Sistema de Segurança': '',
    'Reincidencia': ''
  };

  const questions = [
    'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA SUA EMPRESA',
    'QUAL NÚMERO DE FUNCIONÁRIOS DA SUA EMPRESA?',
    'QUAL O HORÁRIO DE FUNCIONAMENTO?',
    'TIPO DE MERCADORIA COMERCIALIZADA NA SUA EMPRESA?',
    'POSSUI ALGUM SISTEMA DE SEGURANÇA?',
    'O LOCAL OU ALGUM VIZINHO SOFREU ARROMBAMENTO RECENTEMENTE?',
    'INFORMAÇÕES DE CONTATO'
  ];

  const choices = {
    'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA SUA EMPRESA': [
      { text: 'Comércio de rua', value: 'Comércio de rua' },
      { text: 'Sala / escritório em edifício empresarial', value: 'Sala / escritório em edifício empresarial' },
      { text: 'Loja dentro de shopping / galeria', value: 'Loja dentro de shopping / galeria' },
      { text: 'Empresa em área industrial / galpão', value: 'Empresa em área industrial / galpão' }
    ],
    'QUAL NÚMERO DE FUNCIONÁRIOS DA SUA EMPRESA?': [
      { text: '1 a 50 Colaboradores', value: '1 a 50 Colaboradores' },
      { text: 'Mais de 50 Colaboradores', value: 'Mais de 50 Colaboradores' }
    ],
    'QUAL O HORÁRIO DE FUNCIONAMENTO?': [
      { text: 'Horário comercial', value: 'Horário comercial' },
      { text: 'Horário Noturno', value: 'Horário Noturno' },
      { text: '24 Horas', value: '24 Horas' }
    ],
    'TIPO DE MERCADORIA COMERCIALIZADA NA SUA EMPRESA?': [
      { text: 'Grande valor financeiro', value: 'Grande valor financeiro' },
      { text: 'Médio valor financeiro', value: 'Médio valor financeiro' },
      { text: 'Baixo valor financeiro', value: 'Baixo valor financeiro' },
      { text: 'Sem fins lucrativos', value: 'Sem fins lucrativos' }
    ],
    'POSSUI ALGUM SISTEMA DE SEGURANÇA?': [
      { text: 'Sim', value: 'Sim' },
      { text: 'Não', value: 'Não' }
    ],
    'O LOCAL OU ALGUM VIZINHO SOFREU ARROMBAMENTO RECENTEMENTE?': [
      { text: 'Sim', value: 'Sim' },
      { text: 'Não', value: 'Não' }
    ],
    'INFORMAÇÕES DE CONTATO': []
  };

  let currentQuestionIndex = 0;

  function renderChoices() {
    const currentQuestion = questions[currentQuestionIndex];
    const currentChoices = choices[currentQuestion];

    titleOrcamento.innerText = currentQuestion;
    titleServiceOrcamento.innerText = '';

    btnContainer.innerHTML = currentChoices.map(choice => `
      <div class="col-md-12 mb-3 text-center">
        <a class="ot-btn btn-main-color text-cap animation-div choice-button" href="#" data-choice="${choice.value}">${choice.text}</a>
      </div>
    `).join('');

    if (currentQuestion === 'INFORMAÇÕES DE CONTATO') {
      btnContainer.innerHTML = `
        <div class="col-md-12 mb-3 text-center">
          <input type="text" class="form-control mb-3" id="nome" placeholder="Nome" required>
        </div>
        <div class="col-md-12 mb-3 text-center">
          <input type="tel" class="form-control mb-3" id="telefone" placeholder="Telefone" required>
        </div>
        <div class="col-md-12 mb-3 text-center">
          <input type="email" class="form-control mb-3" id="email" placeholder="Email" required>
        </div>
        <div class="col-md-12 mb-3 text-center">
          <button class="ot-btn btn-main-color text-cap animation-div" id="submit-button">Enviar</button>
        </div>`;
      attachSubmitListener();
    } else {
      attachChoiceListeners();
    }
  }

  function attachChoiceListeners() {
    const choiceButtons = document.querySelectorAll('.choice-button');
    choiceButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        const choice = this.getAttribute('data-choice');
        saveUserChoice(choice);
        goToNextQuestion();
      });
    });
  }

  function attachSubmitListener() {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
      submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        showConfirmationMessage();
      });
    }
  }

  function saveUserChoice(choice) {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion === 'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA SUA EMPRESA') {
      userChoices['Tipo de Empresa'] = choice;
    } else if (currentQuestion === 'QUAL NÚMERO DE FUNCIONÁRIOS DA SUA EMPRESA?') {
      userChoices['Número de Colaboradores'] = choice;
    } else if (currentQuestion === 'QUAL O HORÁRIO DE FUNCIONAMENTO?') {
      userChoices['Horário de funcionamento'] = choice;
    } else if (currentQuestion === 'TIPO DE MERCADORIA COMERCIALIZADA NA SUA EMPRESA?') {
      userChoices['Mercadoria comercializada'] = choice;
    } else if (currentQuestion === 'POSSUI ALGUM SISTEMA DE SEGURANÇA?') {
      userChoices['Sistema de Segurança'] = choice;
    } else if (currentQuestion === 'O LOCAL OU ALGUM VIZINHO SOFREU ARROMBAMENTO RECENTEMENTE?') {
      userChoices['Reincidencia'] = choice;
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderChoices();
    }
  }

  function showConfirmationMessage() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const tipoEmpresaText = userChoices['Tipo de Empresa'];
    const tipoColaboradoresText = userChoices['Número de Colaboradores'];
    const tipoFuncionamentoText = userChoices['Horário de funcionamento'];
    const tipoMercText = userChoices['Mercadoria comercializada'];
    const sistemaSegurancaText = userChoices['Sistema de Segurança'];
    const tipoReincidenciaText = userChoices['Reincidencia'];

    const message = `
        Confirme suas informações:
        Nome: ${nome}
        Telefone: ${telefone}
        Email: ${email}
        Suas escolhas:
        Tipo de Empresa: ${tipoEmpresaText}
        Número de Colaboradores: ${tipoColaboradoresText}
        Horário de funcionamento: ${tipoFuncionamentoText}
        Mercadoria comercializada: ${tipoMercText}
        Sistema de Segurança: ${sistemaSegurancaText}
        Reincidencia: ${tipoReincidenciaText}
    `;

    const formattedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/5521971833565/?text=${formattedMessage}`;
    window.open(whatsappLink, '_blank');
  }


  renderChoices();  // Inicializa os botões
});
