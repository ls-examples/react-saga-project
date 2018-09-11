import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function responseItemsToEntities(values, DataRecord) {
  return Object.entries(values).reduce(
    (acc, [id, item]) => acc.set(item.id, new DataRecord({...item})),
    new OrderedMap({})
  )
}

export const normalizeWithoutSpaces = value => {
  if (!value) {
    return value
  }

  return value.trim()
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
