import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldErrorsImpl, FieldValues, Path } from "react-hook-form";
import { FormHelperText, FormLabel } from "@mui/material";

// CSS
import "@wangeditor/editor/dist/css/style.css";

i18nChangeLanguage("en");

export const defaultHtmlValue = /*html*/ `<h1><span style="color: rgb(140, 140, 140);"><em>Title</em></span></h1><hr/><p><span style="color: rgb(89, 89, 89);"><em>Description</em></span></p><p><br></p><p><br></p><p><br></p><p><br></p>`;

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    "fullScreen",
    "insertTable",
    "group-video",
    "group-image",
    "insertLink",
    "codeBlock",
    "fontFamily",
  ],
};

const editorConfig: Partial<IEditorConfig> = {
  placeholder: "Type here...",
};

type RichTextEditorProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  errors: Partial<FieldErrorsImpl<T>>;
  label: string;
};

const RichTextEditor = <T extends FieldValues>({
  name,
  control,
  label,
  errors,
}: RichTextEditorProps<T>) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const isInvalid = useMemo(() => Boolean(errors[name]?.message), [errors, name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <>
          <FormLabel error={isInvalid} sx={{ mb: "10px" }}>
            {label}
          </FormLabel>
          <div style={{ border: `1px solid ${isInvalid ? "red" : "#ccc"}`, zIndex: 100 }} ref={ref}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              defaultConfig={{ ...editorConfig, onBlur }}
              value={value}
              defaultHtml={defaultHtmlValue}
              onCreated={setEditor}
              onChange={(editor) => onChange(editor.getHtml())}
              mode="default"
              style={{ height: "300px", overflowY: "hidden" }}
            />
          </div>
          {isInvalid && (
            <FormHelperText error={isInvalid} margin="dense">
              {errors[name]?.message?.toString()}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default RichTextEditor;
