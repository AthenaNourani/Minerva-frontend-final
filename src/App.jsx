import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';

function App() {
  // 🔐 Zugriff auf Benutzerdaten aus dem Redux-Store
  const { user } = useSelector((state) => state.auth);

  // ⏳ Wenn Auth-Status noch nicht geladen ist → nichts anzeigen
  if (user === undefined) return null;

  return (
    <>
      {/* 📌 Fixierte Navigationsleiste oben */}
      <Navbar />

      {/* 🔄 Dynamischer Seiteninhalt mit Abstand von oben */}
      <div className="mt-[115px]"> {/* ⬅️ اینجا ارتفاع Navbar رو در نظر گرفتم */}
        <Outlet />
      </div>

      {/* 📦 Fußbereich der Seite */}
      <Footer />
    </>
  );
}

export default App;
