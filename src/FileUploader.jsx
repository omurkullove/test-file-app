import React, { useState } from 'react';

const FileUploader = () => {
   const [fileList, setFileList] = useState([]);

   const handleFilePicker = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFileList((prev) => [...prev, ...selectedFiles]);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const formData = new FormData();
         fileList.forEach((file) => {
            formData.append('files', file);
         });

         const response = await fetch('/fake/api', {
            method: 'POST',
            body: formData,
         });

         console.log(response);
         console.log(fileList);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <form action='submit' onSubmit={handleSubmit} className='fileBlock'>
         <center>
            <h1>Выберите файлы:</h1>
            <input
               type='file'
               multiple
               onChange={handleFilePicker}
               required
               maxLength={100}
               minLength={1}
            />
            <button type='submit'>Отправить</button>
            <button type='button' onClick={() => setFileList([])}>
               Очистить
            </button>
         </center>
         <ol>
            {fileList.map((file, index) => (
               <li key={index}>{file.name}</li>
            ))}
         </ol>
      </form>
   );
};

export default FileUploader;
