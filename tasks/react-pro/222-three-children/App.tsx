import React from 'react';

/*
  Dodaj typowanie propsa children dla TripleContainer, które wymusi przekazanie dokładnie trzech komponentów lub elementów HTML.
*/

type TripleContainerProps = {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
};

export const TripleContainer: React.FC<TripleContainerProps> = ({ children }) => {
  return <ul className="list-disc">{children}</ul>;
};

const App = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </TripleContainer>
);

export default App;
