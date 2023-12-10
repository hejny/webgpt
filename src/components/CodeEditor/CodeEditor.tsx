import MonacoEditor from '@monaco-editor/react';
import { classNames } from '../../utils/classNames';
import { useTouchDeviceDetection } from '../../utils/hooks/useTouchDeviceDetection';
import { string_css_class, string_script } from '../../utils/typeAliases';
import styles from './CodeEditor.module.css';

type CodeEditorProps = (
    | {
          /**
           * The code
           */
          readonly defaultValue: string_script;
      }
    | {
          /**
           * The code
           */
          readonly value: string_script;
      }
) &
    (
        | {
              /**
               * If false or undefined, the code in deitor can be edited
               */
              readonly isReadonly?: false;

              /**
               * Called when the code in editor changes
               */
              onChange(newCode: string_script): void;
          }
        | {
              /**
               * If true, the editor is read-only
               */
              readonly isReadonly: true;
          }
    ) & {
        /**
         * Optional CSS class name which will be added to root element
         */
        readonly className?: string_css_class;
    };

/**
 * Renders a Monaco editor OR simple <textarea/> for touch devices
 */
export function CodeEditor(props: CodeEditorProps) {
    const {
        defaultValue,
        value,
        isReadonly: isReadOnly,
        onChange,
        className,
    } = props as any; /* <- TODO: !!! Remove any */

    const isTouchDevice = useTouchDeviceDetection();

    if (isTouchDevice) {
        return (
            <textarea
                className={classNames(styles.fallback, className)}
                onChange={(event) => {
                    const value = event.target.value;
                    onChange(value);
                }}
                {...{ defaultValue, value }}
            />
        );
    }

    return (
        <MonacoEditor
            className={className}
            theme="vs-dark"
            language={'markdown' /* <- TODO: !! Allow to pass */}
            options={{
                wordWrap: 'on',
                readOnly: isReadOnly,
                readOnlyMessage: !isReadOnly
                    ? undefined
                    : {
                          value: 'Output can not be edited.',
                          isTrusted: true,
                      },
                lineNumbers: 'off',
                minimap: { enabled: false },

                //     <- TODO: !! Allow to pass
            }}
            onChange={(value) => {
                if (value === undefined) {
                    return;
                }
                onChange(value);
            }}
            {...{ defaultValue, value }}
        />
    );
}

/**
 * TODO: !! Use ACRY <CodeEditor/> not <MonacoEditor/>
 * TODO: [🧠] Should be the props readonly (for all react components)?
 * TODO: Allow to drop file(s)
 */
