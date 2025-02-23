import { Config } from 'tailwindcss'

const config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    safelist: [
        "bg-red-500",
        "bg-blue-200",
        "bg-green-500",
        "bg-white border-2 border-black",
        "bg-black border-2 border-white",
        "bg-[#000020] border-2 border-white",
        "bg-[#010101] border-2 border-white",
        "bg-[#3178C6]",
        "bg-[#06B6D4]",
        "bg-[#F03E2F]",
        "bg-[#61DAFB]",
        "bg-[#FF6F00]",
        "bg-[#339933]",
        "bg-[#FFCA28]",
        "bg-[#3776AB]",
        "bg-[#CD6799]",
        "bg-[#47A248]",
        "bg-[#F6C915]",
        "bg-[#E34F26]",
        "bg-[#264DE4]",
        "bg-[#777BB4]",
        "bg-[#F29111]",
        "bg-[#F1502F]",
        "bg-[#F7DF1E]",
        "bg-[#3BB2D0]",
        "bg-[#FF9800]",
        "bg-[#0E1129]",
        "bg-[#2F3E46]",
        "bg-[#3DDC84]",
        "bg-[#007396]",
        "bg-[#4CAF50]",
        "bg-[#009688]",
        "bg-[#0E74FF]",
        "bg-[#24292E]",
        "bg-[#333333]",
        "bg-[#E44D26]",
        "bg-[#199900]",
        "bg-[#0e1129]",
        "bg-[#0055FF]",
        "bg-[#88CE02]",
        "bg-[#5C3EE8]",
        "bg-[#F89939]",
        "bg-[#1E90FF]",
        "bg-[#6DB33F]",
        "bg-[#4479A1]",
        "bg-[#2e9bbf]",
        "bg-[#F29111]"
    ],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                secondaryHover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
                textLight: 'rgb(var(--color-text-light) / <alpha-value>)',
                target: 'rgb(var(--color-target) / <alpha-value>)'
            }
        },
        screens: {
            md: { max: '865px' },
            sm: { max: '670px' }
        }
    },
    plugins: []
}
export default config