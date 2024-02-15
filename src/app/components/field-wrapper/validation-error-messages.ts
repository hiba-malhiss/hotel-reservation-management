// we can use lodash templates for more dynamic messages
export const ValidationErrorMessages: { [str: string]: string } = {
  required: 'Field is required',
  min: 'Out of range',
  max: 'Out of range',
  minlength: 'Field length is too short',
  maxlength: 'Field length is too short'
};
