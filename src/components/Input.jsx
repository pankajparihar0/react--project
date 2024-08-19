import React ,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    const id = useId()
return <div className='container m-2'>
    {label && <label htmlFor={id}>
        {label} </label>}
        <input type={type}
        className={`${className}`} ref={ref}
        {...props}
        id={id}></input>
</div>
})

export default Input;
