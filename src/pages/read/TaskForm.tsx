import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Interface } from 'readline';
import './TaskForm.module.css';

interface Props {
    consultDados: string;
}

//const navigate = useNavigate();
// const consultDados = () => {
//     navigate('../read');
// }

const TaskForm = ({ consultDados }: Props) => {

    return (
            <form>
                <div>
                    <label htmlFor='label'>Nome:</label>
                    <input className='buscador' 
                        type="text"
                        name='nomesearch'
                        placeholder='Nome do Remédio'
                        value={""}>
                    </input>
                </div>
                <div>
                    <label htmlFor='label'>Laboratório</label>
                    <input className='buscador'
                        type="text"
                        name='laborsearch'
                        placeholder='Nome do Laboratório'
                        value={""}>
                    </input>
                </div>
                <div>
                    <label htmlFor='label'>Indicação:</label>
                    <input className='buscador' 
                        type="text"
                        name='indicacaosearch'
                        placeholder='Indicação de Uso'
                        value={""}>
                    </input>
                </div>

                <button type='button' className='solid_consult' value={consultDados}>Pesquisar</button>
            </form>
    )
}

export default TaskForm