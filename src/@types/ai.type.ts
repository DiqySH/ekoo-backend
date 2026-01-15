export type ContentItem =
  | {
      type: "text" | "output_text" | "input_text";
      text: string;
    }
  | {
      type: "image";
      image_url: string;
    };

export type Content = string | ContentItem | ContentItem[];
