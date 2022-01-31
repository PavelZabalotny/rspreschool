export default async function (url) {
  try {
    const response = await fetch(url)
    const json = await response.json()
    return json.Search
  } catch (e) {
    console.log(e.message)
  }
}