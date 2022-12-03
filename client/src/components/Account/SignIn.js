import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { AppContext } from '../../App'
import Modal from './Modal'

import { Button, Input, WithSocial } from './Utilities'


export default function Login() {

  const { showSignIn, closeSignIn } = useContext(AppContext);

  const form = useFormik({
    initialValues: { phoneNumberOrEmail: "", password: "" },
    validationSchema: Yup.object().shape({
      phoneNumberOrEmail: Yup.string().required("Phone number or email is required").test('phonNumberOrEmail', value => Yup.string().email().isValidSync(value) || Yup.number().integer().positive().test(phone => {
        return phone && phone.toString().length >= 10 && phone.toString().length <= 14 ? true : false;
      }).isValidSync(value)),
      password: Yup.string().min(6).max(8).required('Password is required'),
    }),
    onSubmit: handleSubmit
  });

  function handleSubmit(values) {
    console.log(values);
    closeSignIn()
  }

  return (
    <Modal isOpen={showSignIn} closeModal={closeSignIn}>
      <div className='relative flex justify-center items-center'>
        <div className='w-full p-5'>
          <span className='block py-3 text-xl font-light text-gray-900'>Please login !</span>
          <form>
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
              forgotPassword={true}
            />
            <Button title="SignIn" onClick={form.handleSubmit} />
            <WithSocial title={"login with"} />
          </form>
        </div>
      </div>
    </Modal>
  )
}

