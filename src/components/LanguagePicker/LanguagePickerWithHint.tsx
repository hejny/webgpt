import { Hint } from '../Hint/Hint';
import { LanguagePicker } from './LanguagePicker';
import styles from './LanguagePicker.module.css';

/**
 * A component that allows the user to switch between languages
 * Together with <Hint/> to highlight the importance of language when creating new wallpaper
 *
 * @returns {JSX.Element} A div element with two links to change the locale.
 */
export function LanguagePickerWithHint() {
    return (
        <Hint
            className={styles.Button}
            id="language-for-new-wallpaper"
            title="Switch language of your desired website"
            reapearCount={3}
            isDisabled // <- TODO: !! Enable - Fix layout of <Hint/>
        >
            <LanguagePicker />
        </Hint>
    );
}

/**
 * TODO: !! Probbably rename to <LocaleSwitcherWithHint (@see https://dev.to/adrai/static-html-export-with-i18n-compatibility-in-nextjs-8cd)
 */
