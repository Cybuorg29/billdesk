module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'navbar': '#0D1117',
        // 'navbar':'#011722',
        'whitesmoke': "#EEF2F6",
        'component': '#FFFFFF',
        'grayFont': '#1B254B',
        'mobileBackground': '#F7F7F8'
      },
      fontFamily: {

        "head": "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap')",
        "s1": "@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap')",
        "ubuntu": ['Ubuntu, sans-serif'],
        "rubik": [' Rubik, sans-serif'],
        "poopins": [' Poppins, sans-serif'],
        "inclusive": [' Inclusive Sans, sans-]serif'],
        'asdas': [' Yuji Hentaigana Akari, cursive'],
        'source': ['Source Sans 3', 'sans-serif'],
        'source2': ['Inter', 'sans-serif']
      },
      aspectRatio: {
        '10/3': '10/3'
      },
      spacing: {
        "fivesix": "56.25rem"
      },
      fontSize: {
        'us': "8px",
        'table': '10px',
        'small': '13px'
      }


    },
  },
  plugins: [],
}