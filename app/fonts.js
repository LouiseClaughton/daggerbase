import localFont from 'next/font/local'

export const Chillax = localFont({
  src: [
    {
      path: '../public/fonts/Chillax-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Chillax-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Chillax-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-chillax',
})