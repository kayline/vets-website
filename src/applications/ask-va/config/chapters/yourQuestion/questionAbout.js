import FormElementTitle from '../../../components/FormElementTitle';
import PageFieldSummary from '../../../components/PageFieldSummary';
import { CHAPTER_2, questionAboutOptions } from '../../../constants';
import { radioSchema, radioUI } from '../../schema-helpers/radioHelper';

const questionAboutPage = {
  uiSchema: {
    'ui:description': FormElementTitle({ title: CHAPTER_2.PAGE_1.TITLE }),
    'ui:objectViewField': PageFieldSummary,
    question: radioUI({
      title: CHAPTER_2.PAGE_1.QUESTION_1,
      labels: questionAboutOptions,
    }),
  },
  schema: {
    type: 'object',
    required: ['question'],
    properties: {
      question: radioSchema(Object.keys(questionAboutOptions)),
    },
  },
};

export default questionAboutPage;
