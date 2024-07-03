import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CheckboxForm = () => {
  return (
    <Formik
      initialValues={{
        checked: false,
      }}
      validationSchema={Yup.object({
        checked: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>
              <Field type="checkbox" name="checked" />
              Accept Terms and Conditions
            </label>
            <ErrorMessage name="checked" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckboxForm;
