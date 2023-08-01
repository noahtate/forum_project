import HomePage from "./components/HomePage";
import inventory from "./data/inventory.json";

export default function App() {
  console.log(inventory);

  return (
    <div id="app">
      <header>
        <h1>Video Store</h1>
      </header>
      <main>
        <HomePage inventory={inventory} />
      </main>
      <footer>© 2023 Video Store</footer>
    </div>
  );
}
