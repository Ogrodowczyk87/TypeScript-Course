import React, { useState } from 'react';
import { SurveyContext } from './context';
import { SurveyProps, ShortAnswerProps, LongAnswerProps, ChoiceProps, SubmitProps, ChoiceOption } from './types';

// Define compound component interface so TS knows about static members
type SurveyCompound = React.FC<SurveyProps> & {
  ShortAnswer: React.FC<ShortAnswerProps>;
  LongAnswer: React.FC<LongAnswerProps>;
  Choice: React.FC<ChoiceProps>;
  Submit: React.FC<SubmitProps>;
};

const Survey: SurveyCompound = ({ children, onSubmit }) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) {
      throw new Error('onSubmit callback is required!');
    }
    onSubmit(values);
  };

  return (
    <SurveyContext.Provider value={{ handleSubmit, values, setValues }}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {children}
      </form>
    </SurveyContext.Provider>
  );
};

const FieldWrapper: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
    <span>{label}{required && <span className="text-red-400 ml-1">*</span>}</span>
    {children}
  </label>
);

const ShortAnswer: React.FC<ShortAnswerProps> = ({ name, label, placeholder, required }) => {
  const ctx = React.useContext(SurveyContext)!;
  return (
    <FieldWrapper label={label} required={required}>
      <input
        aria-label={label}
        name={name}
        required={required}
        value={ctx.values[name] ?? ''}
        onChange={(e) => ctx.setValues((v) => ({ ...v, [name]: e.target.value }))}
        placeholder={placeholder}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FieldWrapper>
  );
};

const LongAnswer: React.FC<LongAnswerProps> = ({ name, label, placeholder, required, rows = 4 }) => {
  const ctx = React.useContext(SurveyContext)!;
  return (
    <FieldWrapper label={label} required={required}>
      <textarea
        aria-label={label}
        name={name}
        required={required}
        rows={rows}
        value={ctx.values[name] ?? ''}
        onChange={(e) => ctx.setValues((v) => ({ ...v, [name]: e.target.value }))}
        placeholder={placeholder}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />
    </FieldWrapper>
  );
};

const Choice: React.FC<ChoiceProps> = ({ name, label, options, required }) => {
  const ctx = React.useContext(SurveyContext)!;
  return (
    <FieldWrapper label={label} required={required}>
      <select
        aria-label={label}
        name={name}
        required={required}
        value={ctx.values[name] ?? ''}
        onChange={(e) => ctx.setValues((v) => ({ ...v, [name]: e.target.value }))}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled hidden>-- wybierz --</option>
        {options.map((opt: ChoiceOption) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </FieldWrapper>
  );
};

const Submit: React.FC<SubmitProps> = ({ children, className }) => (
  <button
    type="submit"
    className={`px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow ${className || ''}`}
  >
    {children}
  </button>
);

// Attach compound components with proper typing
Survey.ShortAnswer = ShortAnswer;
Survey.LongAnswer = LongAnswer;
Survey.Choice = Choice;
Survey.Submit = Submit;

export default Survey;
