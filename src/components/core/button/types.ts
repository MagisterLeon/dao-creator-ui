import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

export type ButtonType = ButtonHTMLAttributes<Element>['type'];

export const BUTTON_VARIANTS = ['cta', 'secondary'] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

export interface ButtonProps {
  className?: string;
  dataTest?: string;
  href?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  onClick?: ((event: Event) => void) | (() => void);
  rel?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  to?: LinkProps['to'];
  type?: ButtonType;
  variant?: ButtonVariant;
}
