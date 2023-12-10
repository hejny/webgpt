import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import type { string_css_class } from '../../utils/typeAliases';
import styles from './ClientVerificationComponent.module.css';

interface ClientVerificationComponentProps {
    /**
     * Content of @@
     */
    readonly children?: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
}

/**
 * Renders a @@
 */
export function ClientVerificationComponent(props: ClientVerificationComponentProps) {
    const { children, className } = props;

    // Use or remove:
    //> const styles = useStyleModule(import('./ClientVerificationComponent.module.css'));

    return <div className={classNames(className, styles.ClientVerificationComponent)}>{children}</div>;
}

/**
 * TODO: !!! Implement
 * TODO: <VerificationCodeInput>
 */
