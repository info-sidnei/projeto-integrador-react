
import Loading from './components/loading/Loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import Rotas from './components/Rotas';
import VLibras from '@djpfs/react-vlibras';

function App() {
   const { isLoadingLoggedUser, user } = useAuthContext();

   return (
      <>
         <div>
            <VLibras forceOnload={true} />
            <main>
               <Rotas />
            </main>
            {isLoadingLoggedUser && <Loading />}
         </div>
      </>
   )
}

export default App;
