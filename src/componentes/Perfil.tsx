import estilos from '../estilizacao/componentes/Perfil.module.css';
import { useContext } from 'react';
import { ContextosDesafio } from '../contextos/ContextosDesafios';

export function Perfil() {
    const { nivel } = useContext(ContextosDesafio);

    return (
        <div className={estilos.containerPerfil}>
            <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" alt="Imagem de perfil"/>
            <div>
                <strong>Emerson Ferreira Fernandes</strong>
                <p>
                    <img src="icons/level.svg" alt="ícone de nível"/>
                    Nível {nivel}
                </p>
            </div>
        </div>
    );
}