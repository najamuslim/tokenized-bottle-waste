import React, { useEffect } from 'react';

type TxtTypeProps = {
  el: HTMLElement;
  toRotate: string[];
  period: number;
};

class TxtType {
  toRotate: string[];
  el: HTMLElement;
  loopNum: number;
  period: number;
  txt: string;
  isDeleting: boolean;

  constructor(el: HTMLElement, toRotate: string[], period: number) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = period || 1000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - 2 * 10;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 900;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

const TypeText: React.FC = () => {
  useEffect(() => {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const toRotate = element.getAttribute('data-type');
      const period = element.getAttribute('data-period');

      if (toRotate) {
        new TxtType(element, JSON.parse(toRotate), parseInt(period || '4000', 10));
      }
    }

    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `.typewrite > .wrap { 
        border-right: 0.07em solid #fff; 
        animation: blink-caret .65s step-end infinite;
    }`;
    document.body.appendChild(css);
  }, []);

  return (
      <span className="typewrite" data-period="4000" data-type='["Bottle", "Bottle", "Bottle"]'>
        <span className="wrap"></span>
      </span>
  );
};

export default TypeText;
