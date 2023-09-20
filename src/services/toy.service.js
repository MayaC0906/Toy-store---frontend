
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'
_createToys()
export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then(toysToReturn => {
            if (filterBy.searchKey) {
                const regExp = new RegExp(filterBy.searchKey, 'i')
                toysToReturn = toysToReturn.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.sortBy) {
                if (filterBy.sortBy === 'price' || filterBy.sortBy === 'createdAt') {
                    const sortKey = filterBy.sortBy
                    toysToReturn = toysToReturn.sort((a, b) => (a[sortKey]- b[sortKey]))
                } else if (filterBy.sortBy === 'name') {
                    toysToReturn = toysToReturn.sort((a, b) => a.name.localeCompare(b.name))
                }
                else toysToReturn
            }
            if (filterBy.toyLabel) {
                console.log(filterBy.toyLabel);
                toysToReturn = toysToReturn.filter(toy => toy.labels.includes(filterBy.toyLabel))
            }

            if (filterBy.inStock) {
                const regExp = new RegExp(filterBy.inStock, 'i')
                toysToReturn = toysToReturn.filter(toy => regExp.test(toy.inStock))
            }
            return toysToReturn
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: null,
        labels: ['Puzzele'],
        createdAt: Date.now(),
        inStock: true,
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [

            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Color sheets',
                price: 150,
                labels: ['Art', 'Box game'],
                createdAt: 1631031814720,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Dinosaour puzzle',
                price: 95,
                labels: ['Box game', 'Puzzle'],
                createdAt: 16314251801011,
                inStock: false,
            },
            {
                _id: 't104',
                name: 'Bycicle',
                price: 157,
                labels: ['On wheels', 'Outdoor'],
                createdAt: 1637586201011,
                inStock: true,
            },
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)

}
function getDefaultFilter() {
    return { searchKey: '', inStock: '', sortBy: '', toyLabel: '' }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


