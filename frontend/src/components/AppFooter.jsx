import booldog_logo from "../assets/logo/logo_booldog.jpg";
export default function AppFooter() {
  return (
    <footer className="py-4 mt-auto bg-black">
      <div className="container d-flex justify-content-center align-items-center gap-2  ">
        <span className="text-white mb-0 small">
          © {new Date().getFullYear()} BoolDog — Tutti i diritti riservati 
        </span>
        <img className="logo" src={booldog_logo} alt="BoolDog logo"/>
      </div>
    </footer>
  )
}
  