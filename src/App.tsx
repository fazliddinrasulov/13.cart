import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import "./App.css";
import AppProvider, { useAppContext } from "./context";
function App() {
  const { isLoading } = useAppContext();
  if (isLoading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: "6rem" }}></div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
