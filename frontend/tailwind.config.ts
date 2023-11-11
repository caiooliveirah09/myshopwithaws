import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        label: '0px 0px 3px #a21caf, 0 0 5px #a21caf, 0 0 20px #a21caf, 0 0 30px #a21caf',
        button: '0px 0px 3px #a5f3fc, 0 0 5px #a5f3fc, 0 0 20px #a5f3fc, 0 0 30px #a5f3fc',
        link: '0px 0px 3px #03bcf4, 0 0 5px #03bcf4, 0 0 8px #03bcf4, 0 0 10px #03bcf4',
        price: '0px 0px 3px #a3e635, 0 0 5px #a3e635, 0 0 8px #a3e635, 0 0 10px #a3e635',
        danger: '0px 0px 3px #f43f5e, 0 0 5px #f43f5e, 0 0 8px #f43f5e, 0 0 10px #f43f5e',
        none: 'none',
      },
      boxShadow: {
        input: '0px 0px 3px #a3e635, 0 0 5px #a3e635',
        button: '0px 0px 3px #a5f3fc, 0 0 5px #a5f3fc, 0 0 10px #a5f3fc, 0 0 25px #a5f3fc',
        card: '0px 0px 3px #03bcf4, 0 0 5px #a5f3fc, 0 0 10px #a21caf, 0 0 25px #03bcf4',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
      matchUtilities(
        {
          'text-shadow': (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
export default config
