import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { ContextosDesafio } from './ContextosDesafios';

interface ContextoContadorDados {
    minutos: number;
    segundos: number;
    ativo: boolean;
    finalizado: boolean;
    iniciarContagem: () => void;
    reiniciarContagem: () => void;
}

interface ContextoContadorProps {
    children: ReactNode
}

let contagemTimeOut: NodeJS.Timeout;

export const ContextoContador = createContext({} as ContextoContadorDados)

export function ContadorProvider({children}: ContextoContadorProps) {
    
    const { iniciarNovoDesafio } = useContext(ContextosDesafio);
    
    const [ tempo, setTempo ] = useState(0.05 * 60);
    const [ ativo, setAtivo ] = useState(false);
    const [ finalizado, setFinalizado ] = useState(false);

    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    function iniciarContagem() {
        setAtivo(true);
    }

    function reiniciarContagem() {
        clearTimeout(contagemTimeOut);
        setAtivo(false);
        setFinalizado(false);
        setTempo(0.05 * 60);
    }

    useEffect(() => {
        if (ativo && tempo > 0) {
            contagemTimeOut = setTimeout(() => {
                setTempo(tempo - 1);
            }, 1000); 
        } else if (ativo && tempo === 0) {
            iniciarNovoDesafio();
            setFinalizado(true);
            setAtivo(false);
        }
    }, [ativo, tempo]);

    return (
        <ContextoContador.Provider 
            value={{
                minutos,
                segundos,
                ativo,
                finalizado,
                iniciarContagem,
                reiniciarContagem,
            }}
        >
            {children}
        </ContextoContador.Provider>
    )
}