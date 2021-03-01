import Head from 'next/head';
import { GetServerSideProps } from 'next';
import estilos from '../estilizacao/pages/Home.module.css';

import { BarraExperiencia } from '../componentes/BarraExperiencia';
import { Contador } from '../componentes/Contador';
import { DesafiosCompletos } from '../componentes/DesafiosCompletos';
import { Perfil } from '../componentes/Perfil';
import { CaixaDesafio } from '../componentes/CaixaDesafio';
import { ContadorProvider } from '../contextos/ContextoContador';
import { DesafiosProvider } from '../contextos/ContextosDesafios';

interface HomeProps {
  nivel: number;
  experienciaAtual: number; 
  desafiosCompletos: number;
}

export default function Home(props: HomeProps) {
  return (
    <DesafiosProvider
      nivel={props.nivel}
      experienciaAtual={props.experienciaAtual}
      desafiosCompletos={props.desafiosCompletos}
    >
      <div className={estilos.container}>
        <Head>
          <title>
            Ínicio - MoveIt
          </title>
        </Head>

        <BarraExperiencia/>
        
        <ContadorProvider>
          <section>
            <div>
              <Perfil />
              <DesafiosCompletos />
              <Contador/>
            </div>
            <div>
              <CaixaDesafio/>
            </div>
          </section>
        </ContadorProvider>
      </div>
    </DesafiosProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (contexto) => {
  const { nivel, experienciaAtual, desafiosCompletos } = contexto.req.cookies;

  return {
    props: {
      nivel: Number(nivel),
      experienciaAtual: Number(experienciaAtual),
      desafiosCompletos: Number(desafiosCompletos),
    }
  }
} 