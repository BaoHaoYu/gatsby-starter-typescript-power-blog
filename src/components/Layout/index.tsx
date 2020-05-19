import React from 'react';
import './index.scss';
import { Container } from '../Container';
import { Header } from './Header/Header';

export function Layout(p: { children?: any }) {
  return (
    <div className={'Layout'}>
      <Header />

      <div className={'section'}>
        <Container>{p.children}</Container>
      </div>

      <div className={'Footer'} />
    </div>
  );
}
