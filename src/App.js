import Nav from "./components/NavBar.tsx";
import Home from "./pages/Home/index.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";




export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}