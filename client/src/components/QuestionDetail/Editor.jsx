import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

function MyRichTextEditor() {
  const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleSave = () => {
    // Metni HTML formatında almak için
    const htmlContent = editorValue.toString('html');
    console.log('Girilen Metin (HTML):', htmlContent);


  };

  return (
    <div>
      <RichTextEditor value={editorValue} onChange={handleEditorChange} />
      <button onClick={handleSave}>Metni Kaydet</button>
    </div>
  );
}

export default MyRichTextEditor;
