/** @format */

import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { useNews } from '@/hooks/useNews';
import { useEffect } from 'react';

function EditorCustom({
  data,
  contentValue,
  setContentValue,
  disabled,
}: {
  data?: any;
  contentValue;
  setContentValue: any;
  disabled: boolean;
}) {
  const { uploadImage } = useNews();
  return (
    <Editor
      disabled={disabled}
      apiKey={import.meta.env.VITE_TINYMCE_KEY}
      initialValue={data?.content}
      value={contentValue}
      onEditorChange={newValue => {
        setContentValue(newValue);
      }}
      init={{
        width: '100%',
        height: 400,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',

          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor image | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        file_picker_types: 'file image media',
        image_uploadtab: true,

        file_picker_callback(callbackFile) {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';

          // Handle the image selection
          input.addEventListener('change', (e: any) => {
            const file = e?.target?.files[0];

            console.log(file);

            const formData = new FormData();
            formData.append('image', file);
            uploadImage({
              formData,
              callback: res => {
                if (res?.message === 'upload successful' && res?.filename) {
                  callbackFile(`${import.meta.env.VITE_IMAGE_HOST}${res?.filename}`, {
                    alt: 'Image',
                  });
                } else {
                  toast.error('Upload image failed');
                }
              },
            });
          });

          // Trigger the input file dialog
          input.click();
        },
      }}
    />
  );
}

export default EditorCustom;
