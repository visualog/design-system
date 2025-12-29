'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Tab = {
  name: string
  value: string
}

interface AnimatedTabsProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (value: string) => void
  children: React.ReactNode
}

export const AnimatedTabs = ({ tabs, activeTab, setActiveTab, children }: AnimatedTabsProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.value === activeTab)
    const activeTabElement = tabRefs.current[activeIndex]

    if (activeTabElement) {
      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth
      })
    }
  }, [activeTab, tabs])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <div className="relative flex justify-start">
        <TabsList className='bg-background rounded-none border-b border-border p-0'>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={el => {
                tabRefs.current[index] = el
              }}
              className='relative rounded-none border-0 bg-transparent px-4 py-2 text-sm font-medium transition-colors duration-300 data-[state=inactive]:text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <motion.div
          className='bg-primary absolute bottom-0 z-20 h-0.5'
          animate={{
            left: underlineStyle.left,
            width: underlineStyle.width
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40
          }}
        />
      </div>
      {children}
    </Tabs>
  )
}

export const AnimatedTabsContent = TabsContent;