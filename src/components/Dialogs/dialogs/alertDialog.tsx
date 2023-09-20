import { message } from '../../../utils/typeAliases';
import { commonDialog } from './_commonDialog';

/**
 * Pops up an alert dialog
 */
export async function alertDialog(message: message): Promise<void> {
    await commonDialog({
        title: <>{/* !!! */}</>,
        message,
        // TODO: !!! Do not show input field
        defaultValue: null,
        placeholder: null,
        isCloseable: true,
    });
}

/**
 * TODO: !!! Use instead of every alert ACRY
 */
