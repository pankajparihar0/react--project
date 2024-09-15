import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RET({name,control,label,defaultValue=""}) {
  return (
    <div>
      {label && <label>
        {label}
        </label>}
        <Controller
        name={name || "content"}
        control={control}
        render = {({field:{onChange}})=>(
            <Editor
            apiKey='tlvb7s5s4xp1w3hbkv2h3k786a80asnstau6cdszouh52zau'
            initialValue={defaultValue}
            onEditorChange={onChange}/>
        )}
        
        />
    </div>
  )
}

export default RET
