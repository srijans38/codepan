import './style.css';

let resizer = document.querySelector('.resizer');
let root = document.documentElement;
let iframe = document.querySelector('#result');
let editorPanel = document.querySelector('.editor-panel');
let codeDivs = document.querySelectorAll('.code');

let orgSize = resizer.getBoundingClientRect().x;
let currVal = 0,
  diff = 0;

let content = {
  htmlContent: ``,
  cssContent: ``,
  jsContent: '',
};

function setSrcDoc() {
  let srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <style>
      ${content.cssContent}
    </style>
    <body>
      ${content.htmlContent}
    </body>
    </html>
  `.replace(`&nbsp;`, ' ');

  iframe.setAttribute('srcdoc', srcDoc);
}

console.log(orgSize);

let setResize = (e) => {
  if (e.clientX > 210) {
    diff = currVal + e.clientX - 10 - orgSize;
    root.style.setProperty('--resize', diff + 'px');
  }
};

// resizer.addEventListener('mousemove', setResize);

resizer.addEventListener('mousedown', (emd) => {
  iframe.style.pointerEvents = 'none';
  editorPanel.style.pointerEvents = 'none';
  window.addEventListener('mousemove', setResize);
});

window.addEventListener('mouseup', (e) => {
  window.removeEventListener('mousemove', setResize);
  editorPanel.style.pointerEvents = 'unset';
  iframe.style.pointerEvents = 'unset';
});

window.addEventListener('resize', (e) => {
  currVal = Number(root.style.getPropertyValue('--resize').split('px')[0]);
  orgSize = resizer.getBoundingClientRect().x;
  console.log(e);
});

// setSrcDoc();
codeDivs.forEach((el) => {
  el.addEventListener('keyup', (e) => {
    content[el.id] = el.textContent;
    console.log(content);
    setSrcDoc();
  });
});
