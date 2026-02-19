
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html",        
  ],
  theme: {
    extend: {
      colors: {
        mepsan:{
          primary:'#0B1F3A',
          secondary:'#0E63F3',
          background:'#F2F5F9',
          carBg:'#FFFFFF',
          border:'#D0D7E2',
          shadow:'rgba(11,31,58,0.15)',
          text:'#0F172A',
          mutedText:'#64748B',
          buttonText:'#FFFFFF',
          badge:"linear-gradient(135deg, #0B1F3A, #1E3A8A)",
          alertColors:{
            success:"#2E7D32",
            succesHover:"#16a34a",
            successActive:"#15803D",
            danger:"#B91C1C",
            dangerHover:"#dc2626",
            dangerActive:"#b91c1c",
            warning:"#CA8A04",
            info:"#1E3A8A",
          }



        },

        
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        dark: '#0f172a',
      },
      fontFamily: {
 
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
}
