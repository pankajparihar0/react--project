import React,{useId} from 'react'

function Select({
    options,
    label,
    className="" ,
    ...props
},ref) {
    const id = useId()
  return (
    <div>
      {label && <lable htmlfor={id} className=''></lable>}
      <select
      {...props} id={id} ref={ref} >
        {options?.map((option)=>(
            <option key={option} value={option} >{option}</option>
        ))}

      </select>
    </div>
  )
}

export default React.forwardRef(Select);
