module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
   
    extend: {
      colors:{
        'navbar':'#0D1117',
        'whitesmoke':"#F4F7FE",
        'component':'#FFFFFF',
        'grayFont':'#1B254B'
      },
      fontFamily:{
        
        "head":"@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap')",
        "s1":"@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap')",
        "ubuntu":'Ubuntu, sans-serif',
        "rubik": 'font-family: Rubik, sans-serif;',
        "poopins":'font-family: Poppins, sans-serif'
      },
      aspectRatio:{
        '10/3':'10/3'
      },
       spacing:{
        "fivesix":"56.25rem"
      },
      fontSize:{
        'us':"8px",
        'table':'10px'
      }
    
      
    },
  },
  plugins: [],
}