import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, removeToy, setFilter } from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    console.log(filterBy);

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
            })
    }, [filterBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }


    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    return (
        <div>
            <main>

                <button><Link to='/toy/Edit'>Add Toy</Link></button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            </main>
        </div>
    )

}