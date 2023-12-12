export default interface Participant {
  maxRecipients?: number;
  eligibilityToSend?: EligibilityToSend;
  eligibleForAward?: EligibileForAward;
  directReportOnly?: boolean;
  supportOptionalCCs?: boolean;
  supportAutoCCs?: boolean;
  supportPublicPost?: boolean;
  dupplicateValidationDays?: number;
}
export enum EligibilityToSend {
  AllUsers,
  ManagerOnly,
  BasedOnDbTeam,
}

export enum EligibileForAward {
  AllUsers,

  BasedOnDbTeam,
}
