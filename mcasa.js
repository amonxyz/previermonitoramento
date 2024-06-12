document.addEventListener("DOMContentLoaded", function () {
  const btnContainer = document.querySelector('.btn-container');
  let titleOrcamento = document.getElementById('title-orcamento');
  let titleServiceOrcamento = document.getElementById('title-service-orcamento2');

  let userChoices = {
    'Tipo de Casa': '',
    'Tipo de Residência': '',
    'Meio de Deslocamento': '',
    'Acesso Secundário': '',
    'Sistema de Segurança': '',
    'Tempo Desocupado': ''
  };

  const questions = [
    'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA VOCÊ',
    'ESCOLHA O TIPO DE RESIDÊNCIA',
    'QUAL É O MEIO DE DESLOCAMENTO?',
    'A RESIDÊNCIA POSSUI ALGUM ACESSO SECUNDÁRIO?',
    'POSSUI ALGUM SISTEMA DE SEGURANÇA?',
    'QUANTO TEMPO A RESIDÊNCIA FICA DESOCUPADA?',
    'INFORMAÇÕES DE CONTATO'
  ];

  const choices = {
    'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA VOCÊ': [
      { text: 'Casa dentro da cidade', value: 'Casa dentro da cidade' },
      { text: 'Casa fora do núcleo urbano', value: 'Casa fora do núcleo urbano' },
      { text: 'Apartamento', value: 'Apartamento' },
      { text: 'Prédio residencial (condomínio)', value: 'Prédio residencial (condomínio)' }
    ],
    'ESCOLHA O TIPO DE RESIDÊNCIA': [
      { text: 'Residência Principal', value: 'Residência Principal' },
      { text: 'Segunda Residência', value: 'Segunda Residência' }
    ],
    'QUAL É O MEIO DE DESLOCAMENTO?': [
      { text: 'A pé', value: 'A pé' },
      { text: 'Carro', value: 'Carro' },
      { text: 'Moto', value: 'Moto' }
    ],
    'A RESIDÊNCIA POSSUI ALGUM ACESSO SECUNDÁRIO?': [
      { text: 'Jardim ou terreno vizinho', value: 'Jardim ou terreno vizinho' },
      { text: 'Varanda ou terraço', value: 'Varanda ou terraço' },
      { text: 'Outro tipo de acesso', value: 'Outro tipo de acesso' },
      { text: 'Sem acesso secundário', value: 'Sem acesso secundário' }
    ],
    'POSSUI ALGUM SISTEMA DE SEGURANÇA?': [
      { text: 'Sim', value: 'Sim' },
      { text: 'Não', value: 'Não' }
    ],
    'QUANTO TEMPO A RESIDÊNCIA FICA DESOCUPADA?': [
      { text: 'Sempre há alguém', value: 'Sempre há alguém' },
      { text: 'Menos de duas horas', value: 'Menos de duas horas' },
      { text: 'Mais de duas horas', value: 'Mais de duas horas' }
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

    if (currentQuestion === 'ESCOLHA O TIPO DE PROTEÇÃO IDEAL PARA VOCÊ') {
      userChoices['Tipo de Casa'] = choice;
    } else if (currentQuestion === 'ESCOLHA O TIPO DE RESIDÊNCIA') {
      userChoices['Tipo de Residência'] = choice;
    } else if (currentQuestion === 'QUAL É O MEIO DE DESLOCAMENTO?') {
      userChoices['Meio de Deslocamento'] = choice;
    } else if (currentQuestion === 'A RESIDÊNCIA POSSUI ALGUM ACESSO SECUNDÁRIO?') {
      userChoices['Acesso Secundário'] = choice;
    } else if (currentQuestion === 'POSSUI ALGUM SISTEMA DE SEGURANÇA?') {
      userChoices['Sistema de Segurança'] = choice;
    } else if (currentQuestion === 'QUANTO TEMPO A RESIDÊNCIA FICA DESOCUPADA?') {
      userChoices['Tempo Desocupado'] = choice;
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

    const tipoCasaText = userChoices['Tipo de Casa'];
    const tipoResidenciaText = userChoices['Tipo de Residência'];
    const meioDeslocamentoText = userChoices['Meio de Deslocamento'];
    const acessoSecundarioText = userChoices['Acesso Secundário'];
    const sistemaSegurancaText = userChoices['Sistema de Segurança'];
    const tempoDesocupadoText = userChoices['Tempo Desocupado'];

    const message = `
        Confirme suas informações:
        Nome: ${nome}
        Telefone: ${telefone}
        Email: ${email}
        Suas escolhas:
        Tipo de Casa: ${tipoCasaText}
        Tipo de Residência: ${tipoResidenciaText}
        Meio de Deslocamento: ${meioDeslocamentoText}
        Acesso Secundário: ${acessoSecundarioText}
        Sistema de Segurança: ${sistemaSegurancaText}
        Tempo Desocupado: ${tempoDesocupadoText}
    `;

    const formattedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/5521971833565/?text=${formattedMessage}`;
    window.open(whatsappLink, '_blank');
  }


  renderChoices();  // Inicializa os botões
});
