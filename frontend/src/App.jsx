import HomePage from "./components/HomePage";
import "../bootstrap/css/bootstrap-responsive.css";
// import "../bootstrap/docs/components.html";
import Example from "./components/example.jsx"
import { Outlet } from "react-router-dom";

export default function App() {
  console.log("hi :)");

  return (
    <div id="app">
      <header>
      </header>
      <main>
        <Outlet/>
        {/* <Example/> */}
        {/* <HomePage/> */}
      </main>
      <footer>© 2023 Video Store</footer>
    </div>
  );
}
