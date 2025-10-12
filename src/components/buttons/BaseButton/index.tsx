import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType } from 'react';
import Link, { LinkProps } from 'next/link';

export type BaseButtonProps =
  | ({ tag?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ tag?: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ tag?: 'Link' } & AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps);

const BaseButton: ComponentType<BaseButtonProps> = (props) => {
  let Tag = props.tag ?? 'button';

  if (Tag === 'Link') {
    return (
      <Link {...props as any}>
        {props.children}
      </Link>
    )
  }

  return (
    <Tag {...props as any}>
      {props.children}
    </Tag>
  )
}

export default BaseButton;
