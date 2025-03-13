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
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
          
        }
    },
    plugins: [],
};
