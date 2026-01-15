"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

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

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex w-full h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const AnimatedTabs = ({ tabs, activeTab, setActiveTab, children }: AnimatedTabsProps) => {
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0 })

  React.useLayoutEffect(() => {
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full flex flex-col gap-4'>
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

const AnimatedTabsContent = TabsContent

export { Tabs, TabsList, TabsTrigger, TabsContent, AnimatedTabs, AnimatedTabsContent }
