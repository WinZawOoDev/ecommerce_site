import React, { useState } from 'react'



const List = () => null
const Item = () => null

function Category({ children }) {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => setMousePosition(prev => ({ ...prev, x: event.clientX, y: event.clientY }));


    const renderItem = () => {
        // const item = findByType(children, Item);
        // if (!item)
        //     return null
        // else {
        //     console.log(item);
        //     const { props: { children } } = item;
        //     if (typeof children === 'function')
        //         return children(mousePosition)
        //     else
        //         return children;
        // }


        if (typeof children === "function") {
            const value = children(mousePosition);
            React.Children.forEach(value, child => console.log(child));
            return children(mousePosition);
        } else {
            const item = findByType(children, Item);
            return !item ? null : item.props.children;
        }
    }



    return (
        <div className='border border-gray-500 h-60 w-56'>
            <ul className=''>
                <li className='' onMouseMove={handleMouseMove}>
                    {renderItem()}
                </li>
            </ul>
        </div>
    )
}



function findByType(children, component) {
    const result = [];

    const type = [component.name] || [component.displayName];

    React.Children.forEach(children, child => {
        const childType = child && child.type && (child.type.displayName || child.type.name);
        if (type.includes(childType))
            result.push(child);
    });

    return result[0];
}


Category.List = List;
Category.Item = Item;

export default Category;

