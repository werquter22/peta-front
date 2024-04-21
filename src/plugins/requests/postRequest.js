import axios from "../axios";

export default function (url, data, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response) => {
                console.log(response)

                context.commit(mutationName, response.data)
                resolve(response)
            })
            .catch((e) => {
                reject(e)
            })
    })
}