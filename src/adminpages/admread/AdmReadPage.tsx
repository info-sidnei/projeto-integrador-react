import React, { useState } from 'react';
import { db } from '../../FirestoreConfig';
import { orderBy, query, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './AdmReadPage.css'
import { HeaderSuperUser } from '../../components/headeruser/HeaderSuperUser';
import Loading from '../../components/loading/Loading';

function ReadPageAdmin() {
  const [showLoading, setShowLoading] = useState(false);

  const [searchInput, setSearchInput] = useState({
    search: {
      hasChanged: false,
      value: ''
    },
  });

  const handleSelectChange = () => {
    setSearchInput({
      search: {
        hasChanged: true,
        value: ''
      }
    });
  };

  const handleInputChange = (event: any) => {
    setSearchInput({
      search: {
        hasChanged: true,
        value: event.target.value,
      },
    });
  };

  function removeAccents(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const consult = (searchInput.search.value);
  let str: string = consult;
  str = str.toLowerCase();
  str = removeAccents(str);
  const hasOnChanged = str;

  var select = document.querySelector<HTMLSelectElement>('select');
  var selectValue = select?.value;
  var isDataLoaded = false;

  function cleanScreen() {
    if (searchInput.search.hasChanged === true) {
      const orderedList = document.getElementById('container');
      orderedList!.innerHTML = '';
    }
  }
  cleanScreen()

  const findTransactions = async () => {
    try {
      if (!isDataLoaded) {
        if (selectValue === 'nome') {
          const querySnapshot = query(collection(db, 'medicamentos'),
            where('nome', '==', hasOnChanged),
            orderBy('atualizado', 'desc'));

          const docSnap = await getDocs(querySnapshot)
          const transactions = docSnap.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id
          }));
          console.log(transactions);
          addTransactionsToScreen(transactions);

        } else if (selectValue === 'laboratorio') {
          const querySnapshot = query(collection(db, 'medicamentos'),
            where('laboratorio', '==', hasOnChanged),
            orderBy('laboratorio', 'asc'));

          const docSnap = await getDocs(querySnapshot)
          const transactions = docSnap.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id
          }));
          console.log(transactions);
          addTransactionsToScreen(transactions);

        } else {
          const querySnapshot = query(collection(db, 'medicamentos'),
            where('indicacao', '==', hasOnChanged),
            orderBy('indicacao', 'desc'));

          const docSnap = await getDocs(querySnapshot)
          const transactions = docSnap.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id
          }));
          console.log(transactions);
          addTransactionsToScreen(transactions);
        }
        isDataLoaded = true;
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  function addTransactionsToScreen(container: any) {
    const orderedList = document.getElementById('container');

    orderedList!.innerHTML = '';

    container.forEach((transaction: any) => {
      console.log(transaction.uid);
      const li = document.createElement('li');
      li.classList.add(transaction.type);
      li.id = transaction.uid;

      const lblNome = document.createElement('p');
      lblNome.innerHTML = 'nome';
      li.appendChild(lblNome);
      const nome = document.createElement('li');
      nome.innerHTML = transaction.nome;
      li.appendChild(nome);

      const lblLaboratorio = document.createElement('p')
      lblLaboratorio.innerHTML = 'Laboratório';
      li.appendChild(lblLaboratorio);
      const laboratorio = document.createElement('li');
      laboratorio.innerHTML = transaction.laboratorio;
      li.appendChild(laboratorio);

      const lblIndicacao = document.createElement('p')
      lblIndicacao.innerHTML = 'Indicação';
      li.appendChild(lblIndicacao);
      const indicacao = document.createElement('li');
      indicacao.innerHTML = transaction.indicacao;
      li.appendChild(indicacao);

      const lblDescricao = document.createElement('p')
      lblDescricao.innerHTML = 'Descrição';
      li.appendChild(lblDescricao);
      const descricao = document.createElement('li');
      descricao.innerHTML = transaction.descricao;
      li.appendChild(descricao);

      const lblApresentacao = document.createElement('p')
      lblApresentacao.innerHTML = 'Apresentação';
      li.appendChild(lblApresentacao);
      const apresentacao = document.createElement('li');
      apresentacao.innerHTML = transaction.apresentacao;
      li.appendChild(apresentacao);

      const lblSubstancia = document.createElement('p')
      lblSubstancia.innerHTML = 'Substância';
      li.appendChild(lblSubstancia);
      const substancia = document.createElement('li');
      substancia.innerHTML = transaction.substancia;
      li.appendChild(substancia);

      const lblTarja = document.createElement('p')
      lblTarja.innerHTML = 'Tarja';
      li.appendChild(lblTarja);
      const tarja = document.createElement('li');
      tarja.innerHTML = transaction.tarja;
      li.appendChild(tarja);

      const lblPreco = document.createElement('p')
      lblPreco.innerHTML = 'Preço';
      li.appendChild(lblPreco);
      const preco = document.createElement('li');
      preco.innerHTML = formatMoney(transaction.preco);
      li.appendChild(preco);

      const lblAtualizado = document.createElement('p')
      lblAtualizado.innerHTML = 'Atualizado';
      li.appendChild(lblAtualizado);
      const atualizado = document.createElement('li');
      atualizado.innerHTML = formatData(transaction.atualizado);
      li.appendChild(atualizado);

      // const lblUid = document.createElement('p')
      // lblUid.innerHTML = 'UID';
      // li.appendChild(lblUid);
      // const uid = document.createElement('li');
      // uid.innerHTML = transaction.uid;
      // li.appendChild(uid);

      orderedList!.appendChild(li);

      const br = document.createElement('br');
      br.classList.add(transaction.type);
      orderedList!.appendChild(br);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Remover';
      deleteButton.classList.add('outline', 'danger');
      deleteButton.addEventListener('click', event => {
        event.stopPropagation();
        const confirm = event.view?.confirm('Deseja Remover este item?');
        if (confirm === true) {
          removeTransaction(transaction)
        }
      })
      li.appendChild(deleteButton);

      // const updateButton = document.createElement('button');
      // updateButton.innerHTML = 'Alterar';
      // updateButton.classList.add('outline', 'caution');
      // updateButton.addEventListener('click', event => {
      //   event.stopPropagation();
      //   window.location.href = '../adminpages/admupdate?uid=' + transaction.uid
      // })
      // li.appendChild(updateButton);
    });
  }

  const removeTransaction = async (transaction: any) => {
    setShowLoading(true);

    const docUid = doc(db, 'medicamentos', transaction.uid);
    const docSnap = await deleteDoc(docUid)
      .then(() => {
        setShowLoading(false);
        document.getElementById(transaction.uid)?.remove();
        document.querySelectorAll("input").forEach(
          input => (input.value = "")
        );
      })
      .catch(error => {
        setShowLoading(false);
        console.log(error);
        alert('Erro ao remover item');
      });
  }

  function formatData(atualizado: string) {
    return new Date(atualizado).toLocaleDateString('pt-br');
  }

  function formatMoney(preco: any) {
    return `${preco.currency} ${preco.value.toFixed(2)}`
  }

  const Buscar = () => {

    isDataLoaded = false;

    findTransactions();
  }

  return (
    <div>
      <HeaderSuperUser />
      <main className='readsearch'>
        <h1>PharmaPlain, informação a um Clique.</h1>
        <h2>Escolha o método de pesquisa:</h2>
        <form className='search'>
          <div>
            <select className='select' id='select' name='select' onChange={handleSelectChange}>
              <option value='nome'>Nome do remédio</option>
              <option value='laboratorio'>Nome do laboratório</option>
              <option value='indicacao'>Uso ou indicação</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder='Digite a pesquisa'
              className='search'
              name='search'
              value={searchInput.search.value}
              onChange={handleInputChange}
            />
          </div>
          <button type='button'
            className='solid'
            onClick={Buscar}
            disabled={!(searchInput.search.value)}>
            Pesquisar
          </button>
        </form>
        {showLoading && <Loading />}
      </main>
      <div className='div'>
        <h2>Resultado da Pesquisa</h2>
      </div>
      <ol id="container"></ol>
    </div>

  )
}
export default ReadPageAdmin;