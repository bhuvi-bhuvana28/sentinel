
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface WebsiteLinkProps {
  text?: string;
  url?: string;
  internal?: boolean;
}

const WebsiteLink = ({ 
  text = "Open SIEM Dashboard", 
  url = "/", 
  internal = true 
}: WebsiteLinkProps) => {
  if (internal) {
    return (
      <Link to={url} className="inline-block">
        <Button className="bg-slate-800 hover:bg-slate-700">
          {text} <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    );
  }
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
      <Button className="bg-slate-800 hover:bg-slate-700">
        {text} <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </a>
  );
};

export default WebsiteLink;
