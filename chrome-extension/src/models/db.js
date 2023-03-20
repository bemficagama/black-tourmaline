import Dexie from 'dexie'
import axios from "axios"
import { toast } from 'react-toastify'
//import { populatePreference } from './populatePreference'
//import { populateCategory } from './populateCategory';
import { populateAge } from './populateAge';
//import { populateUrl } from './populateUrl';

const db = new Dexie('tourmaline');

db.version(1).stores({
  preference: '++id',
  age: '++id, name',
  category: '++id, name',
  key: '++id, key, *categories, *ages',
  url: '++id, url, *categories, *ages',
})

db.checkDatabase = async (token) => {
  const preference = await db.preference.get(1)
  if (!preference) {
    const categories = await axios.get('http://localhost:4000/categories/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.data.map((row) => ({ name: row.name, description: row.description })))
      .catch(err => toast.warn(err.response?.data))
    db.category.bulkAdd(categories)

    const urls = await axios.get('http://localhost:4000/urls/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.data.map((row) => ({ url: row.url })))
      .catch(err => toast.warn(err.response?.data))
    db.url.bulkAdd(urls)

    db.preference.add(
      {
        id: 1,
        execute_url: true,
        execute_title: true,
        starting_time: "00:00",
        end_time: "23:59",
        categories: [],
        ages: [],
        url_blocked: [],
        key_blocked: [],
      },
    )
      .catch(err => toast.warn(err.response?.data))
  }
}

export { db }

//db.on('populate', populatePreference)
//db.on('populate', populateCategory)
db.on('populate', populateAge)
//db.on('populate', populateUrl)
