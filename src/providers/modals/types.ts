import { ComponentType } from 'react';

export interface IModalItem {
  id?: string | number;
  component: ComponentType<any>;
  props?: any;
  close: () => void;
}

export interface IModalOptions<T> {
  id?: string | number;
  component: ComponentType<T>;
  props?: T;
}

export interface IModalProps {
  close: () => any;
}
