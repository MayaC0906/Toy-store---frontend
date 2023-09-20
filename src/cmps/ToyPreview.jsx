import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <li>
            <h4>{toy.name}</h4>
            <h4>{toy.price}</h4>
            {toy.inStock ? <h4>In Stock</h4>:<h4>Not In Stock</h4>}
            <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
            <button> <Link to={`/toy/${toy._id}`}>Details</Link></button>
            <button> <Link to={`/toy/Edit/${toy._id}`}>Edit</Link></button>


        </li>
    )
}