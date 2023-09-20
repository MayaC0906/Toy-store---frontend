
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

export function ToyFilter({ filterBy, onSetFilter }) {

    const labels = useSelector(storeState => storeState.toyModule.labels)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

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

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { searchKey, sortBy, inStock, toyLabel } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter:</h2>
            <form >
                <label htmlFor="sortBy">Sort By:</label>
                <select className='filter' onChange={handleChange} name="sortBy" id="sortBy" value={sortBy}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>

                <label htmlFor="inStock">In stock:</label>
                <select className='filter' onChange={handleChange} value={inStock} name="inStock" id="inStock">
                    <option value=''>All</option>
                    <option value={true}>In Stock</option>
                    <option value={false}>Not In Stock</option>
                </select>

                <label htmlFor="toyLabel">Filter By Labels</label>
                <select className='filter' value={toyLabel} onChange={handleChange} name="toyLabel" id="toyLabel">
                <option value=''>Choose label</option>
                    {labels.map(label => {
                        return <option key={label} value={label}>{label}</option>
                    })}
                </select>

                <input className='filter' value={searchKey} onChange={handleChange} type="search" placeholder="By toy's name" id="searchKey" name="searchKey" />
            </form>

        </section>
    )
}