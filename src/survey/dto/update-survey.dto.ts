export class UpdateSurveyDto {
    readonly id: number;
    readonly config: string;
    readonly tags: string;
    readonly name: string;
    lastUpdateDate:Date;
    readonly visibility: string;
    readonly active: boolean;
  }