import { createContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { IWallpaper } from '../IWallpaper';

export const WallpapersContext = createContext<Record<string /*_uuid*/, BehaviorSubject<IWallpaper>>>({});
