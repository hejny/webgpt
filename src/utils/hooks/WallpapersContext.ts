import { createContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { IWallpaper } from '../interfaces/IWallpaper';

export const WallpapersContext = createContext<Record<string /*_uuid*/, BehaviorSubject<IWallpaper>>>({});
