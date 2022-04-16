import { ShowToast } from '/@/hooks/useShowMessage';

export const validate = (formValues, formSchema) => {
  for (const keys in formValues) {
    if (formValues[keys] === '' || formValues[keys] == null) {
      ShowToast.info(`${formSchema[keys]}不能为空`);
      throw new Error(`${formSchema[keys]}不能为空`);
    }
  }
};
