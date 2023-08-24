import "../bootstrap/css/bootstrap-responsive.css";
import { UserProvider } from "./components/usercontext";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div id="app">
      <main>
        <UserProvider>
          <Outlet />
        </UserProvider>      
      </main>
      <footer>© 2023 forum</footer>
    </div>
  );
}
