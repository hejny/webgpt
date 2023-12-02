import { ReactNode } from 'react';
import { string_css_class, title } from '../../utils/typeAliases';

export interface HintProps {
    /**
     * Unique identifier of the hint
     */
    id: string;

    /**
     * Text of the hint
     */
    title: Exclude<title, JSX.Element>;

    /**
     * Content which will is hinted
     * This is the subject of the hint
     */
    children?: ReactNode;

    /**
     * Number of times the hint will reapear before it is removed permanently
     *
     * !!! Split clicked repeat and appeared cound
     */
    reapearCount: number;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;

    /**
     * If true, the hint will be disabled
     */
    isDisabled?: boolean;
}
