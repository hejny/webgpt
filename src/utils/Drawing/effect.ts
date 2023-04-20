import { IDestroyable } from "destroyable";

export type Effect<TElement extends HTMLElement = HTMLElement> = (element: TElement) => IDestroyable;