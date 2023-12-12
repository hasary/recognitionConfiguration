import { LocalizedString } from './LocalizedString';

export default interface Question {
  Localizations?: LocalizedString[];
  Format?: QuestionFormat;
  DisplayOrder: number;
  disabled?: boolean;
  Type?: string;
  Options?: Option[];
}

export interface Option {
  Localizations?: LocalizedString[];
  DisplayOrder: number;
  SubQuestion?: Question;
  disabled?: boolean;
  score?: number;
}

export enum QuestionFormat {
  Text = 'Text',
  DropDown = 'DropDown',
  Radio = 'Radio',
  Checkbox = 'Checkbox',
}


export interface LevelHelperQuestion extends Question {}
