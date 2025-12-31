
import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ClipboardProps {
  value: string;
  className?: string;
}

const Clipboard: React.FC<ClipboardProps> = ({ value, className }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCopy}
            className={cn("h-5 w-5", className)}
          >
            {hasCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Clipboard };
