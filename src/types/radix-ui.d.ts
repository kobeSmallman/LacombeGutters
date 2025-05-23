declare module '@radix-ui/react-dialog' {
  import * as React from 'react';

  // Components exported by the module
  export const Root: React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } & React.RefAttributes<HTMLElement>>;

  export const Trigger: React.ForwardRefExoticComponent<{
    asChild?: boolean;
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;

  export const Portal: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    container?: HTMLElement;
  } & React.RefAttributes<HTMLDivElement>>;

  export const Overlay: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;

  export const Content: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & {
      forceMount?: boolean;
    } & React.RefAttributes<HTMLDivElement>
  >;

  export const Title: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>
  >;

  export const Description: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>
  >;

  export const Close: React.ForwardRefExoticComponent<
    React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>
  >;
}

declare module '@radix-ui/react-label' {
  import * as React from 'react';

  export const Root: React.ForwardRefExoticComponent<
    React.LabelHTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>
  >;
}
