import { ClosePreventionSystem } from "./0-ClosePreventionSystem";
import { FakeClosePreventionSystem } from "./FakeClosePreventionSystem";

/**
 * @@@
 * 
 * @singleton
 */
export const closePreventionSystem = typeof window === 'undefined'?new FakeClosePreventionSystem():new ClosePreventionSystem();