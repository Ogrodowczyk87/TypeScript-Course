/*
  Zdefiniuj typowanie propsów dla CustomButton, które pozwoli na przekazanie dowolnych atrybutów elementu HTML button.
*/

import React from 'react';

type CustomButtonProps = React.ComponentProps<'button'> & {
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => (
  <button className="p-2 text-white bg-blue-500 rounded-md" {...props}>
    {children}
  </button>
);

// Przykładowe użycie komponentu Card
const App = () => (
  <CustomButton onClick={() => alert('clicked')} type="button">
    Click me
  </CustomButton>
);

export default App;

export { CustomButton };
