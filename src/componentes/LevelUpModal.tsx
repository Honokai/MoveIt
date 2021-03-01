import estilos from '../estilizacao/componentes/LevelUpModal.module.css';
import { useContext } from 'react';
import { ContextosDesafio } from '../contextos/ContextosDesafios';

export function LevelUpModal() {
    const { nivel, fecharModalLevelUp } = useContext(ContextosDesafio);

    return (
        <div className={estilos.overlay}>
            <div className={estilos.container}>
                <header>{nivel}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo nível.</p>
                <button type="button" onClick={fecharModalLevelUp}>
                    <img src="/icons/close.svg" alt=""/>
                </button>
            </div>
        </div>
    )
}