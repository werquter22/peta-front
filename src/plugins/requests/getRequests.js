import axios from "../axios"

export default function (url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                console.log(response)
                let contents = {
                    models: response.data['hydra:member'],
                    totalItems: response.data['hydra:totalItems'],
                    itemsPerPage: response.data['hydra:itemsPerPage']
                }

                context.commit(mutationName, contents)
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}