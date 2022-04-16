import { ShowToast } from '/@/hooks/useShowMessage';

export const validate = (formValues, formSchema) => {
  for (const keys in formValues) {
    if (formValues[keys] === '' || formValues[keys] == null) {
      ShowToast.info(`${formSchema[keys]}不能为空`);
      throw new Error(`${formSchema[keys]}不能为空`);
    }
  }
};

export const reset = (formValues) => {
  for (const keys in formValues) {
    if (typeof formValues[keys] === 'number') {
      formValues[keys] = NaN;
    }
    if (typeof formValues[keys] === 'string') {
      formValues[keys] = '';
    }
    if (formValues[keys] instanceof Array) {
      formValues[keys].length = 0;
    }
  }
};
