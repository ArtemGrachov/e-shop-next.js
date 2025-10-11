import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, useMemo } from 'react';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

import styles from './styles.module.scss';

type ButtonVariant = 'default' | 'primary';

type ButtonProps =
  | ({ tag?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ tag?: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ tag?: 'Link' } & AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps);

interface IProps {
  variant?: ButtonVariant;
}

const Button: ComponentType<IProps & ButtonProps> = (props) => {
  const { variant } = props;
  let Tag = props.tag ?? 'button';

  const buttonTypeClassName = useMemo(() => {
    if (variant === 'primary') {
      return styles._primary;
    }
  }, [variant]);

  const className = clsx(styles.button, buttonTypeClassName, props.className);

  if (Tag === 'Link') {
    return (
      <Link {...props as any} className={className}>
        {props.children}
      </Link>
    )
  }

  return (
    <Tag {...props as any} className={className}>
      {props.children}
    </Tag>
  )
}

export default Button;
