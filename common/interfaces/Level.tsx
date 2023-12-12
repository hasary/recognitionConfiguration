import { LocalizedString } from "./LocalizedString";

export default interface Level {
  Localizations?: LocalizedString[];
  value: number;
  DisplayOrder:number;
  id:number;
  disabled:boolean;
} 