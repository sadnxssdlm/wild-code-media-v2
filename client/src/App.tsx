import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navigation />
      <HomePage />
      <main>{/* Contenu de l'application ici */}</main>
    </>
  );
}

export default App;
