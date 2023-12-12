import * as React from 'react';
import Question, { QuestionFormat } from '../../common/interfaces/Question';
import QuestionManagement from '../../common/QuestionManagement';

export default function RecognitionForm() {
  return (
    <QuestionManagement
      maxQuestions={2}
      questionFormats={[QuestionFormat.Text]}
      headerText="Recognition Form Builder"
      questionType={'message'}
    />
  );
}
