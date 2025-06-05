
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  children?: React.ReactNode;
}

const BackButton = ({ to, children = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="ghost" className="mb-6 -ml-2" onClick={handleBack}>
      <ChevronLeft size={20} className="mr-2" />
      {children}
    </Button>
  );
};

export default BackButton;
