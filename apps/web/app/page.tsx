import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <p>
            rups.io <code>web</code>
          </p>
      </main>
      <footer className={styles.footer}>

        <a
          href="https://app.rups.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          rups.io app →
        </a>
      </footer>
    </div>
  );
}
