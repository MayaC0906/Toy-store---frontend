import { toyService } from "../../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}

export function toyReducer(state = initialState, action = {}) {
    let toys

    // toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys}

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [action.toy, ...state.toys]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        // Filter
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        default:
            return state
    }
}