import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ModelForm = ({ initialValues, validationSchema, onSubmit, fields }) => {
  return (
    <div className="flex justify-content-center align-items-center">
      <Card className="w-full sm:w-30rem p-4 shadow-2">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-column gap-3">
              {fields.map(({ name, label, type = 'text', options }) => (
                <div key={name} className="flex flex-column gap-2">
                  <label htmlFor={name} className="font-semibold text-gray-700">
                    {label}
                  </label>

                  {type === 'select' && options ? (
                    <Dropdown
                      inputId={name}
                      value={values[name]}
                      options={options}
                      onChange={(e) => setFieldValue(name, e.value)}
                      className="w-full"
                      placeholder="Selecciona una opción"
                    />
                  ) : (
                    <Field name={name}>
                      {({ field }) => (
                        <InputText
                          {...field}
                          id={name}
                          type={type}
                          className="p-inputtext-sm w-full"
                          placeholder={`Ingrese ${label.toLowerCase()}`}
                        />
                      )}
                    </Field>
                  )}

                  <ErrorMessage
                    name={name}
                    component="small"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              <Button
                label={isSubmitting ? 'Guardando...' : 'Guardar'}
                icon="pi pi-check"
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ModelForm;
