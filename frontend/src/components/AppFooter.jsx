export default function AppFooter() {
  return (
    <footer className="py-4 mt-auto" style={{ background: '#1a1a2e' }}>
      <div className="container text-center">
        <p className="text-white mb-0 small">
          © {new Date().getFullYear()} BoolDog — Tutti i diritti riservati 🐾
        </p>
      </div>
    </footer>
  )
}