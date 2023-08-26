import { AppMode } from './app-mode.enum';

export interface IAppConfig {
  port: number | undefined;
  mode: AppMode | undefined;
  saltRounds: number;
}
