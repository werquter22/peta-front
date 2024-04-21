export default function(time) {
    const hours = new Date(time).getHours()
    const minutes = new Date(time).getMinutes()

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    return `${formattedHours}:${formattedMinutes}`
}
