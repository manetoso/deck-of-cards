import axios from 'axios'

export const deckApi = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck'
})

export const backOfCardImage = 'https://deckofcardsapi.com/static/img/back.png'
