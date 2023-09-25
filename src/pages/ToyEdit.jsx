import { toyService } from "../services/toy.service.js"
import { addToy, updateToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { LabelFilter } from "../cmps/LabelFilter.jsx"

export function ToyEdit() {

    const [toyToEdit, settoyToEdit] = useState({name:'', price:'', labels:[], inStock:false})
    console.log(toyToEdit);
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(settoyToEdit)
            .catch((err) => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    function handleChange({ target }) {
        let value = target.value
        const field = target.name

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        settoyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (toyToEdit._id) {
            updateToy(toyToEdit)
                .then(() => {
                    navigate('/toy')
                    settoyToEdit(toyService.getEmptyToy())
                })
                .catch((err) => {
                    console.log('Cannot update toy', err)
                    showErrorMsg('Cannot update toy', err)
                })
        } else {
            addToy(toyToEdit)
                .then(() => {
                    navigate('/toy')
                    settoyToEdit(toyService.getEmptyToy())
                })
                .catch((err) => {
                    console.log('Cannot add toy', err)
                    showErrorMsg('Cannot add toy', err)
                })
        }

    }


    const { name, price, inStock } = toyToEdit
console.log('labels from edit',toyToEdit.labels);
    return (
        <section className="toy-edit">
            {toyToEdit._id ? <h2> Edit Toy</h2> : <h2>Add Toy:</h2>}
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} type="text" name="name" value={name} id="name" />
                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} type="number" name="price" value={price} id="price" />
                <label htmlFor="inStock"  className="in-stock-filter">In Stock: 
                <input onChange={handleChange} type="checkBox" name="inStock" checked={inStock} id="inStock"/>
                </label>
                <LabelFilter handleChange={handleChange} labels={toyToEdit.labels}/>
                {toyToEdit._id ? <button>Save</button> : <button>Add</button>}
            </form>
        </section>
    )
}