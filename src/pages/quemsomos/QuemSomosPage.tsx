import { HeaderUser } from '../../components/headeruser/HeaderUser';
import './QuemSomosPage.css'


function QuemSomosPage() {
  return (
    <>
      <HeaderUser />
        <main className='centralize_qsomos'>
            <form>
            <h1>PharmaPlain - Quem somos?</h1>
              <div className='q_somos'>
              <p>
                <span>
                  Somos um grupo universitário que aceitou o desafio de construir esse projeto de auxílio à 
                  pessoas diversas. No ano de 2023, tudo começou como um projeto integrador e após várias 
                  pesquisas e aplicações, foi se tornando cada vez mais interessante e magnífico.
                </span>
              </p>
              <p>
                <span>                       
                  O projeto tem como objetivo solucionar os possíveis problemas de desinformação a respeito
                  dos medicamentos vendidos nas farmácias de todo nosso país, e trazer de forma otimizada essas 
                  informações atraves de consultas neste Terminal Web.
                </span>
              </p>
              <p>
                <span>
                  Por essas pesquisas pode-se obter desde farmacologia até preço médio ao consumidor,
                  trazendo assim rapidez, segurança e construindo um relacionamento de confiança entre consumidores 
                  e fornecedores desses produtos. Nosso terminal de consulta realiza o gerenciamento das informações 
                  de forma ágil, segura e eficiente.
                </span>
              </p>
              <p>
                <span>   
                  Utilizamos em nosso terminal de consulta, informações da Agência Nacional
                  de Vigilância Sanitária (ANVISA) que se destaca como uma fonte primordial e confiável de
                  informações atualizadas. A ANVISA desempenha um papel de suma importância como a
                  principal autoridade reguladora de medicamentos no Brasil, assegurando a qualidade, eficácia
                  e segurança dos produtos farmacêuticos disponíveis no mercado. Sua contribuição como fonte
                  de informações sobre medicamentos é abrangente e inestimável.
                </span>
              </p>
                <span>  
                  <p>Estamos empolgados com o funcionamento do PharmaPlain e esperamos que vocês gostem!</p>
                </span>
              </div>
            </form>
        </main>
    </>
  )
}
export default QuemSomosPage;