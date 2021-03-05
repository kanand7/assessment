import React from 'react';
import cn from 'classnames';

type SectionHeaderProps = {
    className?: string;
    children: React.ReactNode;
};

const SectionHeader = ({ className, children }: SectionHeaderProps) => (
  <div className={cn('section__header', className)}>
    <header>{children}</header>
  </div>
);

export default SectionHeader;
