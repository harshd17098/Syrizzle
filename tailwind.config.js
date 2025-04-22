import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ".flowbite-react\\class-list.json"
    ],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1170px",
				"2xl": "1170px",
			},
			
		},
		extend: {
			colors: {
				primary: {
					400: "#f23d3d",
					500: "#e00000",
					600: "#ba0000",
				},
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},

			backgroundImage: {
				banner: "url('/home-banner.jpg')"
			},
			animation: {
				dropdown: 'dropdownIn 0.3s ease-out',
			  },
			  keyframes: {
				dropdownIn: {
				  '0%': { opacity: '1', transform: 'translateY(-30px) scale(0.95)' },
				  '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
				},
			  },
		},
	},
	plugins: [flowbiteReact],
};