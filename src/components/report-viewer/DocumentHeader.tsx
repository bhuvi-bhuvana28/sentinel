
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";

interface DocumentHeaderProps {
  bookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
}

export function DocumentHeader({ 
  bookmarked, 
  onBookmark, 
  onShare 
}: DocumentHeaderProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBookmark}
        className={bookmarked ? "text-yellow-500 hover:text-yellow-600" : ""}
      >
        <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
