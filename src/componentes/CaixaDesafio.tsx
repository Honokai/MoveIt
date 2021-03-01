import estilos from '../estilizacao/componentes/CaixaDesafio.module.css';
import { useContext } from 'react';
import { ContextosDesafio } from '../contextos/ContextosDesafios';
import { ContextoContador } from '../contextos/ContextoContador';

export function CaixaDesafio() {
    const { desafioAtivo, reiniciarDesafio, completarDesafio, passouNivel, modalClose } = useContext(ContextosDesafio);
    const { reiniciarContagem } = useContext(ContextoContador);

    function handleDesafioConcluido() {
        completarDesafio();
        reiniciarContagem();
    }

    function handleDesafioNaoConcluido() {
        reiniciarDesafio();
        reiniciarContagem();
    }

    return (
        <div className={estilos.containerCaixaDesafio}>
            { desafioAtivo ? (
                <div className={estilos.desafioAtivo}>
                    <header>Ganhe {desafioAtivo.amount}xp</header>
                    <main>
                        <img src={`icons/${desafioAtivo.type}.svg`} alt=""/>
                        <p>{desafioAtivo.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={estilos.desafioNaoConcluido}
                            onClick={handleDesafioNaoConcluido}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={estilos.desafioConcluido}
                            onClick={handleDesafioConcluido}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ): (
                <div className={estilos.desafioNaoAtivo}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="subir de nível"/>
                        Avançe de nível completando desafios.
                    </p>
                </div>
            )}
        </div>
    )
}