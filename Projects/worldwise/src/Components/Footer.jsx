import styles from './Footer.module.css';
function Footer(){
    return (
        <>
            <p>List of cities</p>
            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright{new Date().getFullYear()} by WorldWise Inc.</p>
            </footer>
        </>
    );
}

export default Footer;