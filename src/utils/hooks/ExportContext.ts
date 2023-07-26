import { createContext } from 'react';
import { EXPORT_OPTIONS } from '../../../config';

export const ExportContext = createContext<typeof EXPORT_OPTIONS>(EXPORT_OPTIONS);
