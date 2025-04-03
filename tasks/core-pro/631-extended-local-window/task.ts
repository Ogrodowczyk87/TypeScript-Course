/* Rozszerz interfejs globalnego obiektu window o nowe właściwości wykorzystywane w poniższym kodzie.
  Zrób to w sposób lokalny, który będzie dostępny tylko w tym module.
*/


interface ExtendedWindow extends Window {
  storage: {
    temporaryValue: string;
  };
}

declare const window: ExtendedWindow;

window.storage = {
  temporaryValue: 'Am I testing this code or is it testing me?',
};

console.log(`Temporary value: ${window.storage.temporaryValue}`);
