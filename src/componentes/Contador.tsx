import estilos from '../estilizacao/componentes/Contador.module.css';
import { useContext } from 'react';
import { ContextosDesafio } from '../contextos/ContextosDesafios';
import { ContextoContador } from '../contextos/ContextoContador';

export function Contador() {
    const { 
        minutos,
        segundos,
        finalizado,
        ativo,
        iniciarContagem,
        reiniciarContagem
    } = useContext(ContextoContador);

    const [minutoDezena, minutoUnidade] = String(minutos).padStart(2,'0').split('');
    const [segundoDezena, segundoUnidade] = String(segundos).padStart(2,'0').split('');

    return (
        <div>
            <div className={estilos.contadorContainer}>
                <div>
                    <span>{minutoDezena}</span>
                    <span>{minutoUnidade}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segundoDezena}</span>
                    <span>{segundoUnidade}</span> 
                </div>
            </div>
            { finalizado ? (
                <button
                    disabled 
                    type="button"
                    className={estilos.botaoIniciarContagem}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                { ativo ? (
                        <button type="button" onClick={reiniciarContagem} className={`${estilos.botaoIniciarContagem} ${estilos.botaoContagemAtivo}`}>
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button type="button" onClick={iniciarContagem} className={estilos.botaoIniciarContagem}>
                            Iniciar ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    );
}