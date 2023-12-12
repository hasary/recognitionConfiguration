import Question, {
  LevelHelperQuestion,
  QuestionFormat,
} from './interfaces/Question';
import Level from './interfaces/Level';
import Program from './interfaces/Program';
import Participant, {
  EligibileForAward,
  EligibilityToSend,
} from './interfaces/Participant';
import { Approval, ApprovalActor } from './interfaces/Approval';
import { Value } from './interfaces/Value';
const availableLanguages: string[] = ['en-US', 'fr-CA', 'es-ES'];
const LevelHelperQuestions: LevelHelperQuestion[] = [
  {
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Question level helper 1',
        description: 'Question level helper 1 description ',
      },
    ],
    disabled: false,
    Format: QuestionFormat.Checkbox,
    DisplayOrder: 1,
    Options: [
      {
        disabled: false,
        DisplayOrder: 1,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 1',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 2,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 2',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 3,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 3',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
      {
        disabled: false,
        DisplayOrder: 4,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 4',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
    ],
  },
  {
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Question level helper 2',
        description: 'Question level helper 1 description ',
      },
    ],
    disabled: false,
    Format: QuestionFormat.Checkbox,
    DisplayOrder: 2,
    Options: [
      {
        disabled: false,
        DisplayOrder: 1,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 1',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 2,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 2',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 3,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 3',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
      {
        disabled: false,
        DisplayOrder: 4,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 4',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
    ],
  },
  {
    disabled: false,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Question level helper 3',
        description: 'Question level helper 1 description ',
      },
    ],
    Format: QuestionFormat.Checkbox,
    DisplayOrder: 3,
    Options: [
      {
        disabled: false,
        DisplayOrder: 1,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 1',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 2,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 2',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 3,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 3',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
      {
        disabled: false,
        DisplayOrder: 4,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 4',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
    ],
  },
  {
    disabled: false,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Question level helper 4',
        description: 'Question level helper 1 description ',
      },
    ],
    Format: QuestionFormat.Checkbox,
    DisplayOrder: 4,
    Options: [
      {
        disabled: false,
        DisplayOrder: 1,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 1',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 2,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 2',
            description: 'Wieght: 20',
          },
        ],
        score: 20,
      },
      {
        disabled: false,
        DisplayOrder: 3,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 3',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
      {
        disabled: false,
        DisplayOrder: 4,
        Localizations: [
          {
            cultureCode: 'en-US',
            title: 'Option 4',
            description: 'Wieght: 30',
          },
        ],
        score: 30,
      },
    ],
  },
];
const Messages: Question[] = [
  {
    disabled: false,
    DisplayOrder: 2,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'What is the Impact 2?',
        description: 'Description for Impact',
      },
      {
        cultureCode: 'fr-CA',
        title: "Quel est l' Impact?",
        description: "Déscription pour l' Impact?",
      },
    ],
    Format: QuestionFormat.Text,
  },
  {
    disabled: false,
    DisplayOrder: 1,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'What is the Action 1?',
        description: 'Description for Action',
      },
      {
        cultureCode: 'fr-CA',
        title: "Quel est l' Action?",
        description: "Déscription pour l' Action?",
      },
    ],
    Format: QuestionFormat.Text,
  },
];

const Levels: Level[] = [
  {
    id: 1,
    DisplayOrder: 1,
    disabled: false,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Level One',
        description: 'Level One description',
      },
      {
        cultureCode: 'fr-CA',
        title: 'Level Un',
        description: 'description du Niveau Un',
      },
    ],
    value: 100,
  },
  {
    id: 2,
    DisplayOrder: 2,
    disabled: false,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Level two',
        description: 'Level two description',
      },
      {
        cultureCode: 'fr-CA',
        title: 'Level Deux',
        description: 'description du Niveau Deux',
      },
    ],
    value: 200,
  },
  {
    id: 3,
    DisplayOrder: 3,
    disabled: true,
    Localizations: [
      {
        cultureCode: 'en-US',
        title: 'Level three',
        description: 'Level three description',
      },
      {
        cultureCode: 'fr-CA',
        title: 'Niveau Trois',
        description: 'description du Niveau Trois',
      },
    ],
    value: 300, 
  },
];

const Approvals: Approval[] = [
  {
    level: 1,
    approvalActor: ApprovalActor.Manager,
    substitueActor: ApprovalActor.NotSet,
  },
];

const Programs: Program[] = [
  {
    code: 'demopts',
    description: 'Demo recognition points program',
  },
];
const Participant: Participant = {
  maxRecipients: 4,
  eligibilityToSend: EligibilityToSend.ManagerOnly,
  eligibleForAward: EligibileForAward.AllUsers,
  dupplicateValidationDays: 7,
  supportOptionalCCs: false,
  supportAutoCCs: true,
  supportPublicPost: false,
};
const value: Value = {
  EnableValuesStep: false,
  ShowValuesDescription: true,
  EnableNestedValues: false,
};
const MockData: any = {
  Participant: Participant,
  AvailableLanguages: availableLanguages,
  Questions: { lvlhelp: LevelHelperQuestions, message: Messages },
  Levels: Levels,
  Value: value,
  Approvals: Approvals,
  Programs: Programs,
};
export default MockData;
