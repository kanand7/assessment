import React from 'react';
import cn from 'classnames';

type SectionBodyProps = {
    className?: string;
    children?: React.ReactNode;
};

const SectionBody = ({ className, children }: SectionBodyProps) => (
  <div className={cn('section__body', className)}>
    {children}
  </div>
);

export default SectionBody;
