import { PtpLibraryExecutor } from './lib/src/execution/PtpLibraryExecutor';
import { ptpLibrary } from './ptpLibrary';
import { ptpExecutionTools } from './ptpTools';

/**
 * This is The main library of prompt template pipelines for 1-2i app
 *
 * @singleton
 */
export const ptpLibraryExecutor = new PtpLibraryExecutor(ptpLibrary, ptpExecutionTools);

/**
 * TODO: [🧠] !!! Where should be this
 * TODO: !!! (Make ptpLibraryExecutor for each client + execution library for each client) OR Client should be responsibility in PTP
 */
