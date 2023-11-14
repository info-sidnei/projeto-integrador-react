import { db } from '../../FirestoreConfig';
import { collection, addDoc} from "firebase/firestore";
import Loading from '../../components/loading/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdmCreatePage.css'
import ValidationError from "../../components/validation-error/ValidationError";
import { auth } from '../../FirebaseConfig';
import { HeaderSuperUser } from '../../components/headeruser/HeaderSuperUser';

function CreatePage() {

  const navigate = useNavigate(); 

  interface FormData {
    hasChanged: boolean;
    value: string;
    isDateValid?: boolean;
  }

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

  const [error, setError] = useState(null as any);
  const [showLoading, setShowLoading] = useState(false);

  const cancelClick = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
  }

  const handleClick = async () => {

    setShowLoading(true);

    const dadosRef = await addDoc(collection(db, 'medicamentos'), {
      type: type,
      nome: nome,
      laboratorio: laboratorio,
      indicacao: indicacao,
      substancia: substancia,
      tarja: tarja,
      apresentacao: apresentacao,
      descricao: descricao,
      preco: {
        currency: currency,
        value: value
      },
      data: data,
      user: {
        uid: auth.currentUser.uid
      },
    
    }).then(() => {
      setShowLoading(false)
      alert('Dados Cadastrados com sucesso!');
      navigate('../adminpages/admcreate');
      

    }).catch(error => {
      setShowLoading(false)
      setError(error);
    });
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
    console.log(dadosRef);
  };

  return (
    <>
      <HeaderSuperUser />
      <main className='createlize_creative'>
        <div>
        <h1>PharmaPlain Controle!</h1>
        </div>
        <div >
          <h2>Adicione um novo produto:</h2>
        </div>
        <form className='create'>
          <div>
            <label>Tipo de Medicamento *</label>
            <select
              name='type'
              id='type'
              onChange={ event => setForm({
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
              name='laboratorio'
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
              name='indicacao'
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
              name="substancia"
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
              name='tarja'
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
              type='text'
              name='apresentacao'
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
              name='descricao'
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
              onChange={event => setForm({
                ...form, currency: {
                  hasChanged: true, value: event.target.value
                }
              })}
            > <option value=''>-- Escolha a Moeda --</option>
              <option value='BRL'>Real</option>
              <option value='USD'>Dolar</option>
              <option value='EUR'>Euro</option>
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
              name='data'
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
              !form.data.isDateValid || !form.substancia.value || !form.indicacao.value ||
              !form.apresentacao.value || !form.value.value || !form.currency.value}
            className='solid'
            onClick={handleClick}>
            Enviar
          </button>

          <button type='button'
            className='outline'
            onClick={cancelClick}>
            Cancelar
          </button>
        </form>
        {showLoading && <Loading />}
      </main>
    </>
  )
}
export default CreatePage;