import { TripleContainer } from './App';

const FailTwoChildren = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
    {/* Błąd: Oczekiwano dokładnie 3 dzieci */}
  </TripleContainer>
);

const FailFourChildren = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
    <li>Fourth</li>
    {/* Błąd: Oczekiwano dokładnie 3 dzieci */}
  </TripleContainer>
);

const PassThreeChildren = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
    {/* Poprawne użycie */}
  </TripleContainer>
);

export { FailFourChildren, FailTwoChildren, PassThreeChildren };
