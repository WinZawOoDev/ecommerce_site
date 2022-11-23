import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsHouse, BsChevronExpand, BsCheck2 } from 'react-icons/bs'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { Combobox, Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'
import { useFormik } from 'formik'
import { useImmer } from 'use-immer'

import { selectIsCartEmpty } from '../app/cartSlice'
import OrderSummary from './OrderSummary'
import CartTable from './CartTable'
import { MMRegions } from '../dummyData/MMstate&township'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

export default function DeliveryInfo() {

  const isCartEmpty = useSelector(selectIsCartEmpty);
  const navigate = useNavigate();

  const [houseOrOffice, setHouseOrOffice] = useState({ house: true, office: false });
  const handleHouseOrOffice = ({ house, office }) => setHouseOrOffice(prev => ({ ...prev, house, office }));

  const form = useFormik({
    initialValues: { fullName: "", phoneNumber: "", building: "", colony: "", region: "", city: "", township: "", address: "" },
    onSubmit: values => console.log(values)
  });

  const [regionOptions, setRegionOptions] = useImmer([]);
  const [cityOptions, setCityOptions] = useImmer([]);
  const [townshipOptions, setTownshipOptions] = useImmer([]);

  const getRegions = () => {
    const regions = MMRegions.map(region => ({ id: uuidv4(), eng: region.eng, mm: region.mm }));
    setRegionOptions(regions);
  }

  useEffect(() => {
    if (isCartEmpty) navigate("empty-cart");
    getRegions();
  }, [])


  const handleComboChange = ({ formField, value }) => {
    const { values: formValues, setFieldValue } = form;
    setFieldValue(formField, value.eng);

    let arr = [];
    if ((formField === "region") && (formValues.region !== value.eng)) {
      for (let i = 0; i < MMRegions.length; i++) {
        if (MMRegions[i].eng === value.eng) {
          for (let j = 0; j < MMRegions[i].districts.length; j++) {
            arr.push(MMRegions[i].districts[j])
          }
          break;
        }
      }
      setFieldValue("city", "");
      setFieldValue("township", "");
      setCityOptions(arr);
    } else if (formField === "city" && (formValues.city !== value.eng)) {
      let found;
      for (let i = 0; i < MMRegions.length; i++) {
        for (let j = 0; j < MMRegions[i].districts.length; j++) {
          if (MMRegions[i].districts[j].eng === value.eng) {
            found = true;
            for (let x = 0; x < MMRegions[i].districts[j].townships.length; x++) {
              arr.push(MMRegions[i].districts[j].townships[x]);
            }
            break;
          }
        }
        if (found) break;
      }
      setFieldValue("township", "");
      setTownshipOptions(arr);
    }
  }



  const isValEmpt = (values) => values.length === 0 ? true : false;

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-6 gap-x-2'>
        <div className='col-span-4'>
          <div className='bg-white rounded py-7 px-5 mb-2'>
            <span className='text-lg text-gray-700'>Delivery Information</span>
            <div className='grid grid-rows-4 grid-flow-col gap-2 max-h-[60em]'>
              <Input
                id="fullName"
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your first name and last name"
                value={form.values.fullName}
                onChange={form.handleChange}
              />
              <Input
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                type="number"
                placeholder="Please enter your phone number"
                value={form.values.phoneNumber}
                onChange={form.handleChange}
              />
              <Input
                id="building"
                label="Building / House Number / Floor / Street"
                name="building"
                type="text"
                placeholder="Please Enter"
                value={form.values.building}
                onChange={form.handleChange}
              />
              <Input
                id="colony"
                label="Colony / Suburb / Locality / Landmark"
                name="colony"
                type="text"
                placeholder="Please Enter"
                value={form.values.colony}
                onChange={form.handleChange}
              />
              <SelectComboBox
                label="State / Region"
                name="region"
                type="text"
                placeholder="Please choose your region"
                selectedValue={form.values.region}
                onChange={(value) => handleComboChange({ formField: "region", value })}
                options={regionOptions}
              />
              <SelectComboBox
                label="City"
                name="city"
                type="text"
                placeholder="Please choose your city"
                selectedValue={form.values.city}
                onChange={(value) => handleComboChange({ formField: "city", value })}
                options={cityOptions}
                disabled={isValEmpt(form.values.region)}
              />
              <SelectComboBox
                label="Township"
                name="township"
                type="text"
                placeholder="Please choose your township"
                selectedValue={form.values.township}
                onChange={(value) => handleComboChange({ formField: "township", value })}
                options={townshipOptions}
                disabled={isValEmpt(form.values.city)}
              />
              <Input
                id="address"
                label="Address"
                name="address"
                type="text"
                placeholder="Please enter your address"
                value={form.values.address}
                onChange={form.handleChange}
              />
            </div>
            <div className='relative flex w-full items-center justify-between my-5'>
              <div className='w-1/2'>
                <div className='max-w-[25em] flex justify-end items-center'>
                  <button onClick={() => handleHouseOrOffice({ house: true, office: false })} className={`flex items-center justify-between border border-gray-200 px-4 py-2 rounded-md bg-gray-50 mx-5 ${houseOrOffice.house && " border-cyan-200 focus:border-cyan-400"}`}>
                    <BsHouse className='text-xl text-gray-700' />
                    <span className='ml-2 text-xs font-medium text-gray-700'>House</span>
                  </button>
                  <button onClick={() => handleHouseOrOffice({ office: true, house: false })} className={`flex items-center justify-between border border-gray-200 px-4 py-2 rounded-md bg-gray-50 mx-5 ${houseOrOffice.office && " border-cyan-200 focus:border-cyan-400"}`}>
                    <HiOutlineBuildingOffice className='text-xl text-gray-700' ariaHidden={true} />
                    <span className='ml-2 text-xs font-medium text-gray-700'>office</span>
                  </button>
                </div>
              </div>
              <div className='w-1/2'>
                <div className='max-w-[25em]'>
                  <button type='submit' onClick={() => form.handleSubmit()} className='bg-cyan-600 w-full rounded-md py-2 outline-none'>
                    <span className='uppercase text-white text-sm font-medium'>save</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <CartTable increOrDecreQty={false} />
        </div>
        <div className='col-span-2'>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}


function Input({ id, label, type, name, placeholder, value, onChange }) {
  return (
    <div className='max-w-[25em] my-5'>
      <label htmlFor={name} className='block text-xs text-gray-800 font-medium tracking-wide'>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className="border border-gray-200 focus:border-gray-300 outline-none rounded font-light pl-5 pr-3 py-2 placeholder:text-sm mt-2 w-full"
      />
    </div>
  )
}


function SelectComboBox({ selectedValue, onChange, label, placeholder, options, disabled }) {

  const [query, setQuery] = useState('')

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) =>
        option.eng
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <Combobox disabled={disabled} value={selectedValue} onChange={onChange} as="div" className="relative max-w-[25em] my-5">
      <Combobox.Label className='block text-xs text-gray-800 font-medium tracking-wide'>{label}</Combobox.Label>
      <div className='relative'>
        <Combobox.Input
          placeholder={placeholder}
          className={`border border-gray-200 font-light focus:border-gray-300 outline-none rounded pl-5 pr-3 py-2 placeholder:text-sm mt-2 w-full`}
          displayValue={(option) => option}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 top-2 right-0 flex items-center pr-3">
          <BsChevronExpand
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery('')}
      >
        <Combobox.Options className="absolute z-50 bg-white text-sm w-full shadow-lg border border-gray-100 py-2 rounded-b max-h-[26em] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
          {filteredOption.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 font-light text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredOption.map((option) => (
              <Combobox.Option
                key={option.id}
                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-orange-600 text-white' : 'text-gray-900'}`}
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <div className={`truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      <span className={`mr-2`} >{option.eng}</span>
                      <span className={`${selected ? 'font-medium' : 'font-normal'}`}>( {option.mm} )</span>
                    </div>

                    {selected ? (
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-orange-600'}`} >
                        <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}

SelectComboBox.defaultProps = {
  disabled: false
}