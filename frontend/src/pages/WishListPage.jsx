import { useWishlist } from "../context/WishListContext"

export default function WishListPage() {

    const { test } = useWishlist()


    return (
        <>
            <h1>WishList</h1>
            <p>{test}</p>
        </>
    )

}