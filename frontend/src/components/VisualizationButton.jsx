export default function VisualizationButton({ setListView }) {

    return (
        <div className="d-flex ">
            <button className='btn btn-sm' onClick={() => setListView(true)}>List</button>
            <button className='btn btn-sm' onClick={() => setListView(false)}>grid</button>
        </div>
    )
}