import { useWishlist } from "../context/WishListContext";




export default function WishListButton({ product, slug }) {

    const {
        addToWishList,
        isInWishList
    } = useWishlist();

    const addedToWishList = isInWishList(slug)

    return (
        <button
            onClick={() => addToWishList(product)}
            className="btn btn-wishlist position-absolute top-0 end-0 rounded-circle aspect-ratio-1x1 border d-flex align-items-center justify-content-center cursor-pointer"
        >
            <i
                className={`bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}
            ></i>
        </button>
    )
}