import Link from "next/link";
import Image  from 'next/image' 

import styles from './styles.module.scss'

export default function NavBar(){
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image 
          src="/images/logo.png" 
          alt="logo"
          width={157.16} height={63}
        />
      <div className={styles.link}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                  <Link href="/pokedex">Pokedex</Link>
                  <Link href="/legendarios">Lendarios</Link>
                  <Link href="/documentacao">Documentação</Link>
                </li>
              </ul>
        </div>
      </div>     
    </div>

  )
}