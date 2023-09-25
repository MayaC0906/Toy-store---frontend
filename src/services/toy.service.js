import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
// const STORAGE_KEY = 'toyDB'


export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL+toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL+toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        console.log('hi from put', toy);
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { searchKey: '', inStock: '', sortBy: '', labels: [] }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


