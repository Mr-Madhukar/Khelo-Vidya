export type Difficulty = 'easy' | 'medium' | 'hard';

export type PlantStage = 'seed' | 'small' | 'growing' | 'healthy' | 'fully-grown';

export type LevelType =
  | 'resource_selection' // Level 1: Select essential inputs
  | 'process_builder'    // Level 2: Arrange inputs -> plant -> outputs
  | 'scenario'           // Level 3: Missing resource scenarios
  | 'real_world_problem' // Level 4: Farming & environmental problem-solving
  | 'final_quiz';        // Level 5: Comprehensive assessment

export interface ResourceItem {
  id: string;
  name: string;
  nameOdia: string;
  icon: string;
  isEssential: boolean;
  role: 'energy' | 'reactant_water' | 'reactant_gas' | 'catalyst' | 'distractor';
  feedbackCorrect: string;
  feedbackCorrectOdia: string;
  feedbackIncorrect: string;
  feedbackIncorrectOdia: string;
}

export interface ProcessSlot {
  id: string;
  label: string;
  labelOdia: string;
  position: 'top' | 'left' | 'right' | 'bottom_left' | 'bottom_right';
  acceptedCategory: 'sunlight' | 'water' | 'co2' | 'glucose' | 'oxygen';
  placedItemId: string | null;
}

export interface ProcessItem {
  id: string;
  name: string;
  nameOdia: string;
  icon: string;
  category: 'sunlight' | 'water' | 'co2' | 'glucose' | 'oxygen';
  chemicalSymbol?: string;
}

export interface EnvironmentalFactor {
  icon: string;
  name: string;
  nameOdia: string;
  status: 'low' | 'normal' | 'high' | 'none';
  statusLabel: string;
  statusLabelOdia: string;
}

export interface ScenarioQuestion {
  id: string;
  title: string;
  titleOdia: string;
  contextTag: string;
  contextTagOdia: string;
  story: string;
  storyOdia: string;
  factors: EnvironmentalFactor[];
  question: string;
  questionOdia: string;
  options: string[];
  optionsOdia: string[];
  correctOption: number;
  explanation: string;
  explanationOdia: string;
  hint: string;
  hintOdia: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionOdia: string;
  options: string[];
  optionsOdia: string[];
  correctOption: number;
  explanation: string;
  explanationOdia: string;
  hint: string;
  hintOdia: string;
  difficulty: Difficulty;
  points: number;
}

export interface GameBadge {
  id: string;
  name: string;
  nameOdia: string;
  description: string;
  descriptionOdia: string;
  icon: string;
  unlockedAtLevel?: number;
  scoreThreshold?: number;
}

export interface GameLevelConfig {
  levelNumber: number;
  type: LevelType;
  title: string;
  titleOdia: string;
  subtitle: string;
  subtitleOdia: string;
  xpReward: number;
  stageTarget: PlantStage;
  // Payload variants based on level type
  resourceChallenge?: {
    instruction: string;
    instructionOdia: string;
    items: ResourceItem[];
    requiredCount: number;
  };
  processChallenge?: {
    instruction: string;
    instructionOdia: string;
    slots: ProcessSlot[];
    availableItems: ProcessItem[];
  };
  scenarioChallenge?: {
    scenarios: ScenarioQuestion[];
  };
  quizChallenge?: {
    questions: QuizQuestion[];
  };
}

export interface GameConfig {
  topicKey: string;
  title: string;
  titleOdia: string;
  subtitle: string;
  subtitleOdia: string;
  grade: number;
  subject: string;
  plantType: string;
  plantTypeOdia: string;
  stages: Record<PlantStage, { label: string; labelOdia: string; description: string; descriptionOdia: string }>;
  levels: GameLevelConfig[];
  badges: GameBadge[];
}

export interface GameProgressState {
  lessonId: string;
  currentLevel: number;
  maxUnlockedLevel: number;
  xp: number;
  score: number;
  completedLevels: number[];
  difficulty: Difficulty;
  plantStage: PlantStage;
  badges: string[];
  completed: boolean;
  mistakesInCurrentLevel: number;
  correctInCurrentLevel: number;
  updatedAt?: string;
}
