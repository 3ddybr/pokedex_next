import styles from './styles.module.scss';

export default function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
          Feito com ❤️ para a equipe PokéSpartans
           Platzi Master
          </p>

          <p>3DDY Team</p>
        </div>
        
      </footer>
    </div>
  )
}