import { useState } from 'react';

interface BotaoProps {
    color: string;
    children: string;
    colorTxt: string
}

export function Botao(props: BotaoProps) {

    const [ contador, setContador ] = useState(1);

    function adicionar() {
        setContador(contador + 1);
    }

    function zerar() {
        setContador(1)
    }

    return (
        <button style={{ 
                "backgroundColor": props.color, 
                "color": props.colorTxt
            }}
        type="button" onClick={adicionar} onBlur={zerar} >
            {props.children? props.children : "Eu sou um botao"} {contador}
        </button>
    )
}

