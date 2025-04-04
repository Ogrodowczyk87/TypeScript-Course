/* Dodaj typ generyczne do komponentu List, który pozwoli na dynamiczne wnioskowanie typu elementów listy oraz funkcji renderującej. Wymagaj aby elementy listy miały właściwość id.
 */

interface HasId {
  id: number | string
}

interface ListProps<T extends HasId> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const List = <T extends HasId>({ items, renderItem }: ListProps<T>) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{renderItem(item)}</li>
    ))}
  </ul>
);

// Przykład użycia:
type User = {
  id: number;
  name: string;
  email: string;
};

type Pokemon = {
  id: number;
  name: string;
  type: string;
};

const App = () => {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  const pokemons: Pokemon[] = [
    { id: 1, name: 'Pikachu', type: 'Electric' },
    { id: 2, name: 'Charmander', type: 'Fire' },
  ];

  return (
    <div>
      <List items={users} renderItem={(user) => <span>{user.name}</span>} />
      <List items={pokemons} renderItem={(pokemon) => <span>{pokemon.name}</span>} />
    </div>
  );
};

export default App;
