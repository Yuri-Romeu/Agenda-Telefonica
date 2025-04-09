const form = document.querySelector('form');
const tbody = document.getElementById('tabela-contatos');
let linhas = '';
let nomeNumero = { nome: [], numero: [] };

window.onload = () => {
     const obj = JSON.parse(localStorage.getItem('contato'));

     if (obj) {
          for (let i = 0; i < obj.nome.length; i++) {
               addLinha(obj.nome[i], obj.numero[i]);
          }

          nomeNumero = obj;
     }
};

form.addEventListener('submit', e => {
     const nome = document.getElementById('nome');
     const numero = document.getElementById('numero');

     e.preventDefault();
     if (verificar(numero.value))
          if (nomeNumero.nome.includes(nome.value) || nomeNumero.numero.includes(numero.value)) {
               alert('dados já cadastrarados');
               limpar(nome, numero);
          } else {
               addLinha(nome.value, numero.value);

               nomeNumero.nome.push(nome.value);
               nomeNumero.numero.push(numero.value);
               salvar();
               limpar(nome, numero);
          }
});

function addLinha(nome, numero) {
     let linha = '<tr>';
     linha += `<td>${nome}</td>`;
     linha += `<td>${numero}</td>`;
     linha += `<tr>`;
     linhas += linha;

     tbody.innerHTML = linhas;
}

function limpar(nome, numero) {
     nome.value = '';
     numero.value = '';
}

document.getElementById('resetar').addEventListener('click', () => {
     console.log('resetar funcionando');
     if (confirm('Tem certeza que deseja apagar todos os contatos?')) {
          localStorage.removeItem('contato');
          window.location.reload();
     }
});

function salvar() {
     localStorage.setItem('contato', JSON.stringify(nomeNumero));
     console.log(localStorage.getItem('contato'));
}

function verificar(numero) {
     const regex1 = /^[1-9]{2} (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;

     if (regex1.test(numero)) {
          return true;
     } else {
          alert('Passe um numero valido');
          return false;
     }
}
