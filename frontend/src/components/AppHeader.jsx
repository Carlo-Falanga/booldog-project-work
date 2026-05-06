export default function AppHeader() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                        </ul>
                        <div id="nav_icons" className="d-flex justify-content-around gap-5 fs-4">
                            <div>
                                <i class="bi bi-heart"></i>
                            </div>
                            <div>
                                <i class="bi bi-cart2"></i>
                            </div>
                            <div>
                                <i class="bi bi-search"></i>
                            </div>
                        </div>



                    </div>
                </div>
            </nav>
        </>
    )
}