import { useState, useContext } from 'react';
import estilos from '../estilizacao/componentes/BarraExperiencia.module.css';
import { ContextosDesafio } from '../contextos/ContextosDesafios';

export function BarraExperiencia () {
    const { experienciaAtual, experienciaParaProximoNivel } = useContext(ContextosDesafio)

    var progressao = (experienciaAtual/experienciaParaProximoNivel)*100

    return (
        <header className={estilos.barraDeExperiencia}>
            <span>0 xp</span>
            <div className={estilos.linhaExterna}>
                <div className={estilos.linhaInterna} style={{width: progressao+"%"}}></div> 
                <span className={estilos.experienciaAtual} style={{left: progressao+"%"}}>{experienciaAtual} xp</span>
            </div>
            <span>{experienciaParaProximoNivel} xp</span>
        </header>
    )
}