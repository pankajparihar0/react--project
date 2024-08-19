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
            apiKey='03v2374yv77fs3k8sohjrgof2m7zj0kx05vbjrjxjaw5f5kz'
            initialValue={defaultValue}
            onEditorChange={onChange}/>
        )}
        
        />
    </div>
  )
}

export default RET
