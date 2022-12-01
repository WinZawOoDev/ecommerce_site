import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Button, Input, WithSocial } from './Utilities'


export default function Login() {

  const form = useFormik({
    initialValues: { phoneNumberOrEmail: "", password: "" },
    validationSchema: Yup.object().shape({
      phoneNumberOrEmail: Yup.string().required("Phone number or email is required").test('phonNumberOrEmail', value => Yup.string().email().isValidSync(value) || Yup.number().integer().positive().test(phone => {
        return phone && phone.toString().length >= 10 && phone.toString().length <= 14 ? true : false;
      }).isValidSync(value)),
      password: Yup.string().min(6).max(8).required('Password is required'),
    }),
    onSubmit: values => console.log(values)
  });

  return (
    <div className='container mx-auto'>
      <div className='bg-white rounded flex justify-center items-center p-10'>
        <div className='w-1/2 p-2'>
          <span className='block py-3 text-xl font-light text-gray-900'>Please login !</span>
          <div className='max-w-[27em]'>
            <Input
              label="Phone number or email"
              name="phoneNumberOrEmail"
              type="text"
              placeholder="Please enter your phone number or email"
              value={form.values.phoneNumberOrEmail}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={(form.touched.phoneNumberOrEmail && form.errors.phoneNumberOrEmail) && form.errors.phoneNumberOrEmail}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.values.password}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={(form.touched.password && form.errors.password) && form.errors.password}
            />
            <Button title="SignIn" onClick={form.handleSubmit} />
            <WithSocial title={"login with"} />
          </div>
        </div>
      </div>
    </div>
  )
}

