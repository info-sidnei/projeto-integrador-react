import { addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import Loading from '../../components/loading/Loading';


function UpdatePage() {

  return (
    <>
      <body>
        <header>

        </header>
        <main>
          <h1>Bem vindo ao PharmaPlain!</h1>
          <div >
            <h4>Adicione um novo produto!:</h4>
          </div>

          <form>
            <label>Medicamento</label><br></br>
            <input id="medicamento" name="medicamento"></input><br></br>

            <label>Produto:</label>
            <input type="text" ></input>

            <label>Laboratório</label>
            <input type="text" ></input>

            <label>Substância:</label>
            <input type="text" ></input>

            <label>Apresentação:</label>
            <input type="text" ></input>

            <label>Classe Terapêutica:</label>
            <input type="text" ></input>

            <label>Tarja</label>
            <input type="text" ></input>

            <label>Preço médio</label>
            <input type="text" ></input>

            <button>enviar</button>


          </form>
        </main>
        {<Loading />}

      </body>
    </>
  )
}
export default UpdatePage;