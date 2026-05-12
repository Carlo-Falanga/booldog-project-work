export default function ProductCard({ product }) {


    return (
        <div className="card p-3 h-100">
            <div className="card-img card-header p-3">
                <img src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
            </div>
            <div className=' d-flex align-items-center justify-content-between opacity-75 px-3 pt-3' >
                <div>
                    {product.category}
                </div>
                <div>
                    {product.animal_name}
                </div>
            </div>
            <div className='card-body'>
                <h3 className='card-title'>
                    {product.name}
                </h3>
                <div className=' fs-4'> &euro; {product.price}</div>
            </div>

        </div>
    )
}