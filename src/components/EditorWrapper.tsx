import React from 'react'
import { useQuill } from 'react-quilljs'
import './EditorWrapper.css'
import 'quill/dist/quill.snow.css'
import { ContentCreationModel } from '../models/contentCreation.interface'

function EditorWrapper(props:ContentCreationModel) {
  const { quill, quillRef } = useQuill()

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(props.description)
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('Text change!')
        // console.log(quill.getText()) // Get text only
        // console.log(quill.getContents()) // Get delta contents
        // console.log(quill.root.innerHTML) // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML) // Get innerHTML using quillRef
        props.saveHandler(quill.root.innerHTML)
      })
    }
  }, [quill])

  return (
    <div style={{ width: 500, height: 100,padding:10 }}>
      <div ref={quillRef} />
    </div>
  )
}

export default EditorWrapper
