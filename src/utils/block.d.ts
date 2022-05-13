import Block from './block';

export interface BlockMeta<P = any> {
  props: P;
  tagName: string;
}

export type BlockProps = any;

export type Nullable<T> = T | null;

type Keys<T extends Record<string, unknown>> = keyof T;
type Values<T extends Record<string, unknown>> = T[Keys<T>];
export type Events = Values<typeof Block.EVENTS>;
