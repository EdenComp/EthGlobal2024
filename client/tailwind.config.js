/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		fill: {
			current: "currentColor",
		},
		colors: {
			neutral: {
				white: "#F9F9F9",
				grey_1: "#D9D9D9",
				grey_2: "#5C5C5C",
				black: "#000000",
			},
			background: {
				primary: "#2A2A2A",
				secondary: "#161616",
				tertiary: "#101010",
			},
			orange: {
				100: "#FFECB3",
				200: "#FFE082",
				300: "#FFD54F",
				400: "#FFCA28",
				500: "#FFC107",
				600: "#FFB300",
				700: "#FFA000",
				800: "#FF8F00",
				900: "#FF6F00",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
