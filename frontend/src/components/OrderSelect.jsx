export default function OrderSelect({ handleFilterChange }) {

    return (
        <div className='d-flex gap-3 align-items-baseline'>
            <label htmlFor="product-order" className=' form-label flex-shrink-0'>Ordina i prodotti per</label>
            <select name="product-order" id="product-order" className='form-select w-100' onChange={(e) => handleFilterChange('sort', e.target.value)}>
                <option value="">Recenti</option>
                <option value="name">Nome</option>
                <option value="price-up">Prezzo crescente</option>
                <option value="price-down">Prezzo decrescente</option>
            </select>
        </div>
    )
}