import { createContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import desafios from '../../challenges.json';
import { LevelUpModal } from '../componentes/LevelUpModal';

interface Desafio {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface DadosContextoDesafios {
    nivel: number;
    experienciaAtual: number;
    experienciaParaProximoNivel: number;
    desafiosCompletos: number;
    desafioAtivo: Desafio;
    passouNivel: boolean;
    subirNivel: () => void;
    iniciarNovoDesafio: () => void;
    reiniciarDesafio: () => void;
    completarDesafio: () => void;
    fecharModalLevelUp: () => void;
}

interface DesafiosProviderProps {
    children: ReactNode;
    nivel: number;
    experienciaAtual: number;
    desafiosCompletos: number;
}

export const ContextosDesafio = createContext({} as DadosContextoDesafios)

export function DesafiosProvider({ children, ...rest}: DesafiosProviderProps) {
    const [ nivel, setNivel ] = useState(rest.nivel ?? 1);
    const [ experienciaAtual, setExperienciaAtual ] = useState(rest.experienciaAtual ?? 0);
    const [ desafiosCompletos, setDesafiosCompletos ] = useState(rest.desafiosCompletos ?? 0);
    const [ desafioAtivo, setDesafioAtivo ] = useState(null);
    const [passouNivel, setPassouNivel] = useState(false);
    const [modalLevelUp, setModalLevelUp] = useState(false);
    const experienciaParaProximoNivel = Math.pow((nivel + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('nivel', String(nivel));
        Cookies.set('experienciaAtual', String(experienciaAtual));
        Cookies.set('desafiosCompletos', String(desafiosCompletos));
    }, [nivel, experienciaAtual, desafiosCompletos]);

    function modalClose() {
        setPassouNivel(false);
    }

    function subirNivel() {
        setNivel(nivel + 1);
        setModalLevelUp(true);
    }

    function fecharModalLevelUp() {
        setModalLevelUp(false);
    }

    function iniciarNovoDesafio() {
        const indexDesafioAleatorio = Math.floor(Math.random() * desafios.length)
        const desafio = desafios[indexDesafioAleatorio];
        setDesafioAtivo(desafio);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio :)', {
                body: `Valendo ${desafio.amount}xp`,
            })
        }
    }

    function reiniciarDesafio() {
        setDesafioAtivo(null);
    }

    function completarDesafio() {
        if(!desafioAtivo) {
            return;
        }
        
        const { amount } = desafioAtivo;

        let experienciaFinal =  experienciaAtual + amount;
        
        if(experienciaFinal >= experienciaParaProximoNivel) {
            experienciaFinal = experienciaFinal - experienciaParaProximoNivel;
            subirNivel()
        }
        setExperienciaAtual(experienciaFinal);
        reiniciarDesafio();
        setDesafiosCompletos(desafiosCompletos + 1);
    }

    return (
        <ContextosDesafio.Provider 
            value={{
                nivel,
                subirNivel,
                experienciaAtual,
                experienciaParaProximoNivel,
                desafiosCompletos, 
                iniciarNovoDesafio,
                desafioAtivo,
                reiniciarDesafio,
                completarDesafio,
                passouNivel,
                fecharModalLevelUp
            }}
        >
            { children }
            { modalLevelUp && (
                <LevelUpModal/>
            )}
        </ContextosDesafio.Provider>
    )
}
