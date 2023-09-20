import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { removeToy } from "../store/actions/toy.actions.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {

    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    console.log(toy);

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    function onDeleteToy() {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg(`Toy removed: ${toyId}`)
                console.log(`Toy removed: ${toyId}`)
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    else return (
        <section className="toy-details">
            <section className="toy-info">
                <h2>Toy name: {toy.name}</h2>
                <h2>Price: {toy.price}</h2>
                <ul>Labels:
                    {toy.labels.map(label => <li>{label}</li>)}
                </ul>
                <h3>Created at: {utilService.formatDate(toy.createdAt)}</h3>
                {toy.inStock ? <h3>In stock</h3> : <h3>In stock</h3>}
                <h5>Id: {toy._id}</h5>
            </section>

            <section className="toy-btns">
                <button><Link to={`/toy/edit/${toy._id}`}>Edit toy</Link></button>
                <button><Link to="/toy">Back</Link></button>
                <button onClick={onDeleteToy}>Delete toy</button>
            </section>
        </section>
    )

}