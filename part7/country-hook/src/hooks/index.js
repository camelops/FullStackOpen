import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // async function fetchCountry(name) {
    //   const result = await axios(
    //     `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    //   )
    //   console.log(result)
    //   setCountry({
    //     ...result,
    //     found: true
    //   })
      if (name === '') {
        return
      }

      axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((response) => {
        if (response.status === 200) {
          setCountry({
            data: response.data[0],
            found: true
          })
        } else {
          setCountry({
            data: null,
            found: false
          })
        }
      })
      .catch((error) => {
        console.log(`Faled to get country: "${name}"`)
      })

    }, [name])

  return country
}