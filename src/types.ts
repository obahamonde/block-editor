import blocks from "~/lib";

export type Notification = {
  message: string;
  status: "success" | "error" | "warning" | "info";
};

export type User = {
  ref: string;
  ts: string;
  email: string | undefined;
  email_verified: boolean | undefined;
  family_name: string | undefined;
  given_name: string | undefined;
  locale: string | undefined;
  name: string;
  nickname: string | undefined;
  picture: string | undefined;
  sub: string;
  updated_at: string | undefined;
};

export type Message = {
  ts: number;
  ref: string;
  owner: string;
  content: string;
  namespace: string;
};

export type Namespace = {
  messages: string[];
  title: string;
  user: string;
  participants: string[];
  ref: string;
  ts: string;
};

export type FileData = {
  name: string;
  size: number;
  contentType: string;
  lastModified: number;
  file: File;
  url: string;
  ref?: string;
  ts?: string;
};
export type WordCount = {
  word: string;
  count: number;
};

export type BookOrDocument = {
  namespace: string;
  title: string;
  wordcloud: WordCount[];
  file?: FileData;
  audio?: string;
  cover?: string;
};

export type DataVisualization = {
  ref: string;
  ts: string;
  labels: string[];
  datasets: string[][] | number[][];
  title: string;
  namespace: string;
  file?: FileData;
};

export type Block = {
  id: string;
  type: "TextBlock"; // Extend this as you add more block types
  content: string;
};

export const BlockMapping: Record<string, Component> = {
  TextBlock: blocks.TextBlock,
};
