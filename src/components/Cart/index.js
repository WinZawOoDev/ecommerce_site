import React, { createContext } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { useImmer } from 'use-immer'
import CartView from './CartView'
import DeliveryInfo from './DeliveryInfo'
import EmptyCart from './EmptyCart'
import Payment from './Payment'

export const CartViewContext = createContext({});

const STEP_NAMES = { deli: "Delivery Info", payment: "Payment", confirm: "Confirmed", finish: "Finished" };

export default function Cart() {

    const [stepperState, setStepperState] = useImmer([
        { id: 1, name: STEP_NAMES.deli, isFinished: false },
        { id: 2, name: STEP_NAMES.payment, isFinished: false },
        { id: 3, name: STEP_NAMES.confirm, isFinished: false },
        { id: 4, name: STEP_NAMES.finish, isFinished: false }
    ]);

    const changeStepperState = ({ name, isFinished }) => setStepperState(prev => {
        const index = prev.findIndex(list => list.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) prev[index].isFinished = isFinished;
    })

    return (
        <CartViewContext.Provider value={{ stepNames: STEP_NAMES, steps: stepperState, changeStepperState }}>
            <Routes>
                <Route element={<><Outlet /></>}>
                    <Route index element={<CartView />} />
                    <Route path='deli-info' element={<><Outlet /></>}>
                        <Route index element={<DeliveryInfo />} />
                        <Route path='empty-cart' element={<EmptyCart />} />
                        <Route path='payment' element={<Payment />} />
                    </Route>
                    <Route path='empty-cart' element={<EmptyCart />} />
                </Route>
            </Routes>
        </CartViewContext.Provider>
    )
}
