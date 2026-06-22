import { Inter } from 'next/font/google'
import localFont from 'next/font/local';

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const montreuil = localFont({
    src: './Montreuil Signature.otf',
    display: 'swap',
    variable: '--font-montreuil-signature'
})

export const werid_word = localFont({
    src: './Weird Words.otf',
    display: 'swap',
    variable: '--font-weird-word'
})