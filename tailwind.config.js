module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"todos-bg": "url('./img/confetti-doodles.svg')",
			},
			fontFamily: {
				title: ["'Bebas Neue'", "Roboto", "sans-serif"],
				button: ["Oswald", "sans-serif"],
				card: ["Poppins", "sans-serif"],
			},
			boxShadow: {
				"3xl": "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
			},
			colors: {
				background: "#f4f8ff",
				primary: "#150052",
				primaryLight: "#210c5e",
				neutral: "#f5f5f5",
			},
		},
	},
	plugins: [],
};
