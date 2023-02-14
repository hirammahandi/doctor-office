import { createEditor } from "@wangeditor/editor";
import { z } from "zod";
import { defaultHtmlValue } from "../../../components/RichTextEditor";

const getEditorValue = (html: string) => {
  const editor = createEditor({ html });
  const htmlValue = editor.getHtml();
  const textContent = editor.getText().replaceAll("\n", "").trim();

  return { htmlValue, textContent };
};

export const createMedicalRecordSchema = z
  .object({
    description: z
      .string({
        invalid_type_error: "Must be a string",
        required_error: "Description is required",
      })
      .superRefine((html, ctx) => {
        const { htmlValue, textContent } = getEditorValue(html);
        if (htmlValue === defaultHtmlValue) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Description. Please remove the default description and add one.",
            fatal: true,
          });

          return z.NEVER;
        }

        if (!textContent) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Description is required",
          });
        }
      }),
  })
  .required();

export const keysCreateMedicalRecordSchema = createMedicalRecordSchema.keyof();
