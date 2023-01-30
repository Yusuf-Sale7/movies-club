import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useApi = (url) => {

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

      axios.get(url).then(
        res => {
          setTimeout(() => {
              setError(false)
              setLoading(false)
              setResult(res.data)
          }, 100)
        }
      )
      .catch(
        err => {
          setError(true)
          setLoading(false)
          toast.error(err.message)
          console.log(err);
        }
      )
      .then(
        setLoading(true),
      )
  }, [url])

  return [ result, loading, error ]
}