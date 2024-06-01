/** @format */

'use client';

import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, ScrollArea } from '..';
import { CommonSvg } from '@/assets/CommonSvg';
import { CommonNavItems } from '@/assets/NavItems';

const mainNavItems = CommonNavItems;
export function DesktopNav() {
  return (
    <nav className='mr-2'>
      <ScrollArea className='my-4 h-[calc(100vh)] pr-4'>
        <div className='pl-1 '>
          <Accordion type='multiple' className='w-full'>
            {mainNavItems?.map((item, index) => (
              <AccordionItem value={item.title} key={index}>
                <AccordionTrigger className='text-sm capitalize'>
                  <div className='w-full flex flex-row gap-x-5'>
                    {CommonSvg[`${item?.icon}`]?.()}
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col space-y-2'>
                    {item.items?.map((subItem, index) =>
                      subItem.href ? (
                        <MobileLink
                          key={index}
                          href={subItem.href}
                          pathname={subItem.href}
                          // disabled={subItem.disabled}
                        >
                          {subItem.title}
                        </MobileLink>
                      ) : (
                        <div key={index} className='text-foreground/70 transition-colors'>
                          {item.title}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </nav>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
}

function MobileLink({ children, href, disabled, pathname }: MobileLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      {children}
    </Link>
  );
}
