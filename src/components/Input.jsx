import React ,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    Change = ()=>{},
    ...props
},ref){
    console.log({...props})
    const id = useId()
return <div className='container m-2'>
    {label && <label htmlFor={id}>
        {label} </label>}
        <input type={type}
        className={` m-2 ${className}`} onBlur={()=>console.log("Clicked")}  ref={ref}
        {...props}
        id={id}/> 
</div>
})

export default Input;
