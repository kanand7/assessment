import React from 'react';
import cn from 'classnames';
import SectionHeader from './SectionHeader';
import SectionBody from './SectionBody';

type SectionProps = {
    children: React.ReactNode;
    className?: string;
}

const Section = ({ children, className }: SectionProps) => (
  <section className={cn('section', className)}>
    {children}
  </section>
);

Section.Header = SectionHeader;
Section.Body = SectionBody;

export default Section;
