import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishListContext"


export default function WishListPage() {

    const { wishlist } = useWishlist()


    return (
        <div className="container">
            <h1>WishList</h1>
            <div className="row row-cols-4">
                {
                    wishlist.map(item =>
                        <Link to={`/product/${item.slug}`} key={item.id}>
                            <div>
                                <img className="img-fluid" src={`http://localhost:3000/images/products/${item.img_url}`} alt={item.name} />
                            </div>
                            {item.name}
                        </Link>
                    )
                }
            </div>
        </div>
    )

}