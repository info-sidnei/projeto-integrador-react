import { HeaderUser } from './headeruser/HeaderUser';
import './NotPermission.css';

function NotPermission() {
    return (
        <>
            <HeaderUser />
            <div className="centralize">
                <div className="notpermission">
                    <h2>Voce não tem permissão para acessar essa página!</h2>
                </div>
            </div>
        </>
    )
}

export default NotPermission;