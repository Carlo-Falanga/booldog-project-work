export default function SearchBar({ search, handleFilterChange }) {

    return (
        <input type="text" className='form-control d-inline w-25' placeholder='Ricerca un prodotto...  ' value={search} onChange={(e) => handleFilterChange('search', e.target.value)} />
    )
}