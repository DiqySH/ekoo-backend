export type TextContent = {
  type: "input_text";
  text: string;
};

export type ImageContent = {
  type: "input_image";
  image_url: string;
};

export type Content = string | (TextContent | ImageContent)[];
