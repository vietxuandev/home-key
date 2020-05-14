import React from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function LoginForm(props) {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={8} md={6}>
        <Paper
          elevation={4}
          style={{ padding: '20px 15px', marginTop: '30px' }}
        >
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <Form>
            <FormControl fullWidth margin="normal">
              <InputLabel>Phone number</InputLabel>
              <Field name="phoneNumber">
                {({ field }) => <Input fullWidth {...field} />}
              </Field>
              {touched.phoneNumber && errors.phoneNumber && (
                <FormHelperText>{errors.phoneNumber}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Password</InputLabel>
              <Field name="password">
                {({ field }) => <Input fullWidth type="password" {...field} />}
              </Field>
              {touched.password && errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Signup
              </Button>
            </FormControl>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}

const FormikForm = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      phoneNumber: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    // Handle submit form
    console.log(values);
    props.postLogin(values);
    // setTimeout(() => {
    //   if (values.phoneNumber === '0869123020') {
    //     setErrors({ phoneNumber: 'Email already taken' }); // Set error bag
    //   } else {
    //     resetForm(); // Clear form data
    //   }
    setSubmitting(false); // Set isSubmitting to false
    // }, 1000);
  },
})(LoginForm);

export default FormikForm;
