import estilos from '../estilizacao/componentes/DesafiosCompletos.module.css';
import { useContext } from 'react';
import { ContextosDesafio } from '../contextos/ContextosDesafios';

export function DesafiosCompletos() {
    const { desafiosCompletos } = useContext(ContextosDesafio);

    return (
        <div className={estilos.desafiosCompletos}>
            <span>Desafios completos</span>
            <span>{desafiosCompletos}</span>
        </div>
    );
}