import { ProjectTypes } from './ProjectTypes';

export interface Answers {
  project: {
    name: string;
    type: ProjectTypes;
  };
  frameworks: {
    base: string;
    css: string;
  };
}
