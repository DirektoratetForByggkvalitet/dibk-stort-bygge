import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Primitives } from 'losen';
import { IntroMain } from '../primitives/IntroMain';

function Intro({ close, data }) {
  if (Object.keys(data).length !== 0) {
    close();
  }
  return (
    <Primitives.Wizard>
      <IntroMain>
        <Primitives.Heading.H1>Hvor stort kan du bygge?</Primitives.Heading.H1>
        <Primitives.Paragraphs.Lead>
          Skal du bygge noe? Stort eller smått? Husk at du må holde deg innenfor det som kalles{' '}
          <strong>tillatt grad av utnytting</strong>. Det bestemmer hvor stor del av eiendommen du
          har lov å bygge på. Bruk denne veilederen for å være sikker på at du ikke bygger for
          stort.
        </Primitives.Paragraphs.Lead>
        <section>
          <div>
            <Primitives.Heading.H2 small>Før du begynner</Primitives.Heading.H2>
            <Primitives.Paragraphs.P>
              Gå til din kommunes nettside eller kontakt kommunen for å finne:
            </Primitives.Paragraphs.P>
            <ol>
              <li>
                Reguleringsplan for eiendommen din (hvis kommunens nettside har en kartløsning, er
                som regel reguleringsplanen der)
              </li>
              <li>Kommuneplanens arealdel</li>
              <li>Kommunedelplan</li>
              <li>Kommunens parkeringsnorm</li>
              <li>
                Matrikkelbrev for eiendommen din. Du kan også{' '}
                <a href="http://www.seeiendom.no/">se eiendommens størrelse på seeiendom.no</a>
              </li>
            </ol>
          </div>
          <div>
            <Primitives.Figure>
              <img src="/img/intro_mac.png" alt="" />
            </Primitives.Figure>
          </div>
        </section>
        <section>
          <div>
            <Primitives.Heading.H2 small>
              Pass på at dokumentene eller kommunen gir deg svar på dette:
            </Primitives.Heading.H2>
            <ol>
              <li>
                Om eiendommen din er regulert (finnes det en reguleringsplan er eiendommen regulert)
              </li>
              <li>
                Om det står noe om tillatt grad av utnytting i reguleringsplan eller kommuneplan.{' '}
                <span style={{ color: '#c1272d', fontWeight: 'bold' }}>Merk!</span> Dette må stå
                oppgitt som en av følgende:
                <ul>
                  <li>BYA eller %BYA</li>
                  <li>BRA eller %BRA</li>
                  <li>%TU</li>
                  <li>T-BRA</li>
                </ul>
                ellers kan du ikke bruke denne veiviseren
              </li>
              <li>
                Om det står noe i kommuneplanen/-delplanen om at den gjelder foran reguleringsplanen
              </li>
              <li>
                Når kommuneplanen/-delplanen og reguleringsplanen er vedtatt.{' '}
                <span style={{ color: '#c1272d', fontWeight: 'bold' }}>Merk!</span> Sjekk nøye at du
                har siste versjon av planene
              </li>
              <li>Om kommunen har en parkeringsnorm</li>
              <li>
                Hvor mange parkeringsplasser det er krav til at du har i terrenget (ikke i garasje)
                på eiendommen din, og hvor stor hver plass må være
              </li>
            </ol>
          </div>
          <div>
            <Primitives.Figure>
              <img src="/img/intro_documents.png" alt="" />
            </Primitives.Figure>
          </div>
        </section>
        <Primitives.Heading.H2 small>Har du funnet det du trenger?</Primitives.Heading.H2>
        <Primitives.Paragraphs.P>
          Da er det bare å sette i gang med veiviseren - du får hjelp til hvert spørsmål underveis.
        </Primitives.Paragraphs.P>
        <Primitives.Button.MainButton type="button" onClick={() => close()}>
          Start veiviseren
        </Primitives.Button.MainButton>
      </IntroMain>
    </Primitives.Wizard>
  );
}

Intro.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(state => ({ data: state['@WIZARD_STATE'] }))(Intro);
