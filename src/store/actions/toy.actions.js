import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_TOYS, UPDATE_TOY} from "../reducers/toy.reducer.js"
import { store } from '../store.js'

export function loadToys() {
    const { filterBy } = store.getState().toyModule
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys})
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })

}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function addToy(toyToAdd) {
    return toyService.save(toyToAdd)
        .then(savedToy => {
            store.dispatch({ type: ADD_TOY, toy: savedToy })
        })
        .catch(err => {
            console.log('Cannot add toy', err)
            throw err
        })
}

export function updateToy(toyToUpdate) {
    return toyService.save(toyToUpdate)
        .then((savedtoy) => {
            store.dispatch({ type: UPDATE_TOY, toy: savedtoy })
        })
        .catch(err => {
            console.log('Cannot update toy', err)
            throw err
        })
}

export function setFilter(newFilter) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: newFilter })
}