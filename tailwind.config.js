/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                gold: '#F9690E',
                pink: '#FF477E'
            }
        }
    },
    plugins: []
}

