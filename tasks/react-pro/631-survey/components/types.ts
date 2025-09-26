export interface SurveyContextType {
  handleSubmit: (e: React.FormEvent) => void;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface SurveyProps {
  onSubmit?: (values: Record<string, any>) => void;
  children: React.ReactNode;
}

export interface BaseFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

export interface ShortAnswerProps extends BaseFieldProps {
  placeholder?: string;
}

export interface LongAnswerProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
}

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface ChoiceProps extends BaseFieldProps {
  options: ChoiceOption[];
}

export interface SubmitProps {
  children: React.ReactNode;
  className?: string;
}
