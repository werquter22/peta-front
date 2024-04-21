import axios from "../axios";

export default function (url) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url)
            .then((response) => {
                console.log(response)

                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}