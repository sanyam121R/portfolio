import { Inter, Doto, Mansalva } from 'next/font/google'
import localFont from 'next/font/local';

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const doto = Doto({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-doto'
});

export const mansalva = Mansalva({
    subsets: ['latin'],
    weight: "400",
    display: 'swap',
    variable: '--font-mansalva'
});

export const montreuil = localFont({
    src: '../public/fonts/Montreuil Signature.otf',
    display: 'swap',
    variable: '--font-montreuil-signature'
})

export const werid_word = localFont({
    src: '../public/fonts/Weird Words.otf',
    display: 'swap',
    variable: '--font-weird-word'
})