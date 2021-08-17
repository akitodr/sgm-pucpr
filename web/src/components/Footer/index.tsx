import React from 'react';
import {FooterClass, TextClass} from './styles';

type TypeContent = {
  title: string;
  msg: string;
};


export function Footer(props: TypeContent) {
  const footerStatus = localStorage.getItem('sgm-alert-footer');

  function handleCloseCookieAlert() {
    document.querySelector('.FooterClass')?.classList.add('ClosedCookieAlert');
    localStorage.setItem('sgm-alert-footer', 'true');
  }

  return (
    <>
      {footerStatus == null && (
      <FooterClass>
        <div className="FooterClass">
          <footer>
            <button type="button" className="CloseCookieAlert" onClick={handleCloseCookieAlert}>X</button>
            <TextClass>
              <b>{props.title}</b>
              <p>{props.msg}</p>
            </TextClass>
          </footer>
        </div>
      </FooterClass>
      )}
    </>
  );
}