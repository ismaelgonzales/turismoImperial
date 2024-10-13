/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                red: {
                    950: '#BF303C',
                },
                yellow: {
                    950: '#F2A516',
                },
                blue: {
                    950: '#20415A',
                },
            },
        },
    },
    plugins: [],
};
