import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={barlowSemiCondensed.className}>
      <Component {...pageProps} />
    </main>
  );
}
