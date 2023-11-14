import './AdmUpdatePage.css';
import React, { useState, useEffect } from 'react';
import { HeaderSuperUser } from '../../components/headeruser/HeaderSuperUser';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../FirestoreConfig';
import { useNavigate } from 'react-router-dom';
import ValidationError from "../../components/validation-error/ValidationError";



function AdmUpdatePage() {

  interface FormData {
    hasChanged: boolean;
    value: string;
    isDateValid?: boolean;
  }

  const [showLoading, setShowLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('nome');
  }

  function isNewTransaction() {
    return getTransactionUid() ? false : true;
  }

  const findTransactionByUid = async (nome: string | null) => {
    setShowLoading(true);
    try {

      if (!isDataLoaded) {

        const collRef = collection(db, "medicamentos");
        const docRef = query(collRef, where("nome", "==", nome));
        const getRef = await getDocs(docRef)

        const transaction = getRef.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id
        }));
        console.log(transaction);

        fillTransactionScreen(transaction);
        setIsDataLoaded(true);
      }

    } catch (error) {
      alert("Documento não existe")
      window.location.href = "../admread/AdmReadPage.tsx"
      console.error('Erro ao buscar os dados:', error);
    }
  }

  useEffect(() => {
    if (!isNewTransaction()) {
      const nome = getTransactionUid();
      findTransactionByUid(nome);
      console.log(nome)
    }
  }, []); // Passando um array vazio como segundo argumento para executar apenas uma vez

  const [form, setForm] = useState({
    type: { hasChanged: false, value: "" },
    nome: { hasChanged: false, value: "" },
    laboratorio: { hasChanged: false, value: "" },
    indicacao: { hasChanged: false, value: "" },
    substancia: { hasChanged: false, value: "" },
    tarja: { hasChanged: false, value: "" },
    apresentacao: { hasChanged: false, value: "" },
    descricao: { hasChanged: false, value: "" },
    currency: { hasChanged: false, value: "" },
    value: { hasChanged: false, value: "" },
    uid: { hasChanged: false, value: "" },
    data: { hasChanged: false, value: "" } as FormData
  })

  const type = form.type.value;
  const nome = form.nome.value;
  const laboratorio = form.laboratorio.value;
  const indicacao = form.indicacao.value;
  const substancia = form.substancia.value;
  const tarja = form.tarja.value;
  const apresentacao = form.apresentacao.value;
  const descricao = form.descricao.value;
  const currency = form.currency.value;
  const value = parseFloat(form.value.value);
  const data = form.data.value;
  const uid = form.uid.value;

  function fillTransactionScreen(transaction: any) {
    const firstTransaction = transaction[0]
    form.apresentacao.value = firstTransaction.apresentacao
    console.log(form.apresentacao.value)

    form.currency.value = firstTransaction.preco.currency
    console.log(form.currency.value)

    form.data.value = firstTransaction.data
    console.log(form.data.value)

    form.descricao.value = firstTransaction.descricao
    console.log(form.descricao.value)

    form.indicacao.value = firstTransaction.indicacao
    console.log(form.indicacao.value)

    form.laboratorio.value = firstTransaction.laboratorio
    console.log(form.laboratorio.value)

    form.nome.value = firstTransaction.nome
    console.log(form.nome.value)

    form.substancia.value = firstTransaction.substancia
    console.log(form.substancia.value)

    form.tarja.value = firstTransaction.tarja
    console.log(form.tarja.value)

    form.type.value = firstTransaction.type
    console.log(form.type.value)

    form.value.value = firstTransaction.preco.value
    console.log(form.value.value)

    form.uid.value = firstTransaction.uid
    console.log(form.uid.value)
  }

  async function handleClick(transaction: any) {
    await updateTransaction();
  };

  const cancelClick = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
  }

  const backClick = () => {
    navigate('../adminpages/admread');
  }

  const updateTransaction = async () => {
    if (form.uid.value) {
      setShowLoading(true);
      const docRef = doc(db, 'medicamentos', form.uid.value);
      await updateDoc(docRef, {
        type: form.type.value,
        nome: form.nome.value,
        laboratorio: form.laboratorio.value,
        indicacao: form.indicacao.value,
        substancia: form.substancia.value,
        tarja: form.tarja.value,
        apresentacao: form.apresentacao.value,
        descricao: form.descricao.value,
        preco: {
          currency: form.currency.value,
          value: parseFloat(form.value.value)
        },
        data: form.data.value
      });
      alert('Dados atualizados com sucesso!')
      cancelClick()
      setShowLoading(false);
      navigate('../adminpages/admread')
    } else {
      console.error("UID is undefined");
    }
  }

  return (
    <>
      <HeaderSuperUser />
      <main className='createlize_creative'>
        <div>
          <h1>PharmaPlain Controle!</h1>
        </div>
        <div >
          <h2>Atualização de produtos:</h2>
        </div>
        <form className='create'>
          <div>
            <label>Tipo de Medicamento *</label>
            <select
              name='type'
              id='type'
              value={form.type.value}

              onChange={event => setForm({
                ...form, type: {
                  hasChanged: true, value: event.target.value
                }
              })}

            >
              <option value=''>-- Selecione um tipo --</option>
              <option>Anticoncepcional</option>
              <option>Calmantes</option>
              <option>Disfunção-Erétil</option>
              <option>Emagrecedores</option>
              <option>Oftálmicos</option>
              <option>Isentos-de-Prescrição</option>
              <option>Uso-contínuo</option>
              <option>Vitaminas</option>
              <option>Outros</option>
            </select>
            <ValidationError
              hasChanged={form.type.hasChanged}
              errorMessage='Tipo de medicamento é obrigatório'
              testId='type-required'
              type='required'
              value={form.type.value} />
          </div>

          <div>
            <label>Nome do Medicamento *</label>
            <input className='create'
              type='text'
              name='nome'
              id='nome'
              value={form.nome.value}
              placeholder='Entre com o Nome'

              onChange={event => setForm({
                ...form, nome: {
                  hasChanged: true, value: event.target.value
                }
              })}

            />
            <ValidationError
              hasChanged={form.nome.hasChanged}
              errorMessage='Nome é obrigatório'
              testId='nome-required'
              type='required'
              value={form.nome.value} />
          </div>

          <div>
            <label>Laboratório *</label>
            <input className='create'
              type='text'
              id='laboratorio'
              name='laboratorio'
              value={form.laboratorio.value}
              placeholder='Laboratório'

              onChange={event => setForm({
                ...form, laboratorio: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

            <ValidationError
              hasChanged={form.laboratorio.hasChanged}
              errorMessage='Laboratório é obrigatório'
              testId='labor-required'
              type='required'
              value={form.laboratorio.value} />
          </div>

          <div>
            <label >Indicação *</label>
            <input className='create'
              type='text'
              id='indicacao'
              name='indicacao'
              value={form.indicacao.value}
              placeholder='Ex: Asma, tosse, coração'

              onChange={event => setForm({
                ...form, indicacao: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

            <ValidationError
              hasChanged={form.indicacao.hasChanged}
              errorMessage='Indicação é obrigatório'
              testId='indicacao-required'
              type='required'
              value={form.indicacao.value} />
          </div>

          <div>
            <label htmlFor='substancia'>Substâncias *</label>
            <input className='create'
              type='text'
              id='substancia'
              name="substancia"
              value={form.substancia.value}
              placeholder='Substâncias utilizadas'

              onChange={event => setForm({
                ...form, substancia: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

            <ValidationError
              hasChanged={form.substancia.hasChanged}
              errorMessage='Substâncias é obrigatório'
              testId='subst-required'
              type='required'
              value={form.substancia.value} />
          </div>

          <div>
            <label htmlFor='tarja'>Tarja</label>
            <input className='create'
              type='text'
              id='tarja'
              name='tarja'
              value={form.tarja.value}
              placeholder='Cor da tarja ou Sem tarja'

              onChange={event => setForm({
                ...form, tarja: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

          </div>

          <div>
            <label htmlFor='apresentacao'>Apresentação *</label>
            <input className='create'
              id='apresentacao'
              type='text'
              name='apresentacao'
              value={form.apresentacao.value}
              placeholder='Ex: Comprimido, injetável ou líquido, qtd: 20ml'

              onChange={event => setForm({
                ...form, apresentacao: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

            <ValidationError
              hasChanged={form.apresentacao.hasChanged}
              errorMessage='Apresentação é obrigatório'
              testId='apres-required'
              type='required'
              value={form.apresentacao.value} />
          </div>

          <div>
            <label htmlFor='descricao'>Descrição</label>
            <input className='create'
              type='text'
              id='descricao'
              name='descricao'
              value={form.descricao.value}
              placeholder='Descreva a respeito - Opcional'

              onChange={event => setForm({
                ...form, descricao: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />

          </div>
          <div>
            <label>Tipo de Moeda *</label>
            <select
              name='currency'
              id='currency'
              value={form.currency.value}

              onChange={event => setForm({
                ...form, currency: {
                  hasChanged: true, value: event.target.value
                }
              })}
            >
              <option value=''>-- Escolha a Moeda --</option>
              <option value='BRL'>BRL</option>
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
            </select>
            <ValidationError
              hasChanged={form.currency.hasChanged}
              errorMessage='Moeda é obrigatório'
              testId='moeda-required'
              type='required'
              value={form.currency.value} />
          </div>

          <div>
            <label htmlFor='preco'>Preço *</label>
            <input className='create'
              type="number"
              name='value'
              id='value'
              value={form.value.value}
              placeholder='Use o ponto para centavos - Ex: 26.90'

              onChange={event => setForm({
                ...form, value: {
                  hasChanged: true, value: event.target.value
                }
              })}

            />
            <ValidationError
              hasChanged={form.value.hasChanged}
              errorMessage='Preço é obrigatório'
              testId='value-required'
              type='required'
              value={form.value.value} />
            <ValidationError
              errorMessage="O valor deve ser maior ou igual a zero"
              hasChanged={form.value.hasChanged}
              testId="preco-invalid"
              type="invalid"
              value={form.value.value}
            />
          </div>

          <div>
            <label htmlFor='data'>Data *</label>
            <input className='create'
              type="date"
              id='data'
              name='data'
              value={form.data.value}

              onChange={event => {
                const selectedDate = (event.target.value);
                const minDate = new Date('2022-01-01');
                const currentDate = new Date(selectedDate);
                const isDateValid = selectedDate !== '' && currentDate >= minDate;
                setForm({
                  ...form,
                  data: {
                    hasChanged: true,
                    value: event.target.value,
                    isDateValid: isDateValid
                  }
                })
              }}

            />
            <ValidationError
              hasChanged={form.data.hasChanged}
              errorMessage='Data obrigatória/inválida'
              testId='data-required'
              type='required'
              value={form.data.value}
            />
            <ValidationError
              hasChanged={form.data.hasChanged}
              errorMessage='Data deve ser superior a 2022'
              testId='data-invalid'
              type='date'
              value={form.data.value}
            />
          </div>

          <button type='button'
            disabled={!form.type.value || !form.nome.value || !form.laboratorio.value ||
              !form.data.value || !form.substancia.value || !form.indicacao.value ||
              !form.apresentacao.value || !form.value.value || !form.currency.value}
            className='solid'
            onClick={handleClick}
          >
            Enviar
          </button>

          <button type='button'
            className='outline'
            onClick={cancelClick}
          >
            Cancelar
          </button>
          <button type='button'
            className='clear'
            onClick={backClick}
          >
            Voltar
          </button>
        </form>
      </main>
    </>
  )
}
export default AdmUpdatePage
