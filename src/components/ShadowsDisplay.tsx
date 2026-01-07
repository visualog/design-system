import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ShadowsDisplay: React.FC = () => {
  const { shadows } = designSystemData;
  const [hoverStyles, setHoverStyles] = React.useState<{ [key: number]: React.CSSProperties }>({});
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = () => {
    if (!containerRef.current || itemRefs.current.length === 0) return;
    const container = containerRef.current;

    // Get dimensions
    const padding = 32; // p-8
    const firstItem = itemRefs.current[0];
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const itemHeight = firstItem.offsetHeight;
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const count = itemRefs.current.length;

    // Calculate total available travel distance for the top-left corner of the items
    // Start: (padding, padding)
    // End: (containerW - padding - itemWidth, containerH - padding - itemHeight)
    const startX = padding;
    const startY = padding;
    const endX = containerW - padding - itemWidth;
    const endY = containerH - padding - itemHeight;

    const stepX = count > 1 ? (endX - startX) / (count - 1) : 0;
    const stepY = count > 1 ? (endY - startY) / (count - 1) : 0;

    const newStyles: { [key: number]: React.CSSProperties } = {};

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const currentLeft = item.offsetLeft;
      const currentTop = item.offsetTop;

      const targetLeft = startX + (index * stepX);
      const targetTop = startY + (index * stepY);

      const dx = targetLeft - currentLeft;
      const dy = targetTop - currentTop;

      newStyles[index] = {
        transform: `translate(${dx}px, ${dy}px)`,
        zIndex: 10 + index,
        transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
      };
    });
    setHoverStyles(newStyles);
  };

  const handleMouseLeave = () => {
    setHoverStyles({});
  };

  const isHovering = Object.keys(hoverStyles).length > 0;

  return (
    <div className="flex flex-col gap-12 font-pretendard">
      <style>{`
        @keyframes shadow-fade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          65% { opacity: 1; }
          80% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      {/* Visual Overview */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">스케일</h2>
        </div>

        <div
          ref={containerRef}
          className="w-full border border-border rounded-xl bg-secondary p-8 cursor-default group relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {shadows.shadow_tokens.map((shadow: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 will-change-transform"
                ref={el => { itemRefs.current[index] = el }}
                style={{
                  ...hoverStyles[index],
                  transition: hoverStyles[index] ? hoverStyles[index].transition : 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                <div className="w-full h-32 bg-white rounded-xl flex items-center justify-center border border-border relative">
                  {/* Shadow Layer with Opacity Animation */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      boxShadow: shadow.css_value,
                      animation: 'shadow-fade 6s ease-in-out infinite'
                    } as React.CSSProperties}
                  />
                  {/* Content */}
                  <span className={`absolute z-10 transition-all duration-500 whitespace-nowrap ${isHovering ? 'top-4 left-4 translate-x-0 translate-y-0 text-sm font-medium text-muted-foreground' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground'}`}>
                    Elevation {shadow.token.replace('shadow_', '').charAt(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">토큰</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">토큰명</TableHead>
                <TableHead className="w-1/3">값</TableHead>
                <TableHead className="w-1/3">설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shadows.shadow_tokens.map((shadow: any, index: number) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">${shadow.token}</span>
                      <Clipboard value={shadow.token} />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {shadow.css_value}
                  </TableCell>
                  <TableCell className="text-sm">{shadow.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default ShadowsDisplay;