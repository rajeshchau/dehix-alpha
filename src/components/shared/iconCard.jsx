import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../components/ui/tooltip';

const IconCard = ({ title, icon, description, buttonProps }) => {
  return (
    <div className="flex flex-col">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Card className="items-center justify-center text-center p-5 mb-3 shadow-2xl transform transition-transform duration-300 hover:scale-105">
              {icon}
            </Card>
            <div className="flex">
              <div className="mr-auto text-left px-1">
                <h1 className="text-md uppercase">{title}</h1>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="w-6 h-6 mr-1"
                {...buttonProps}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">{description}</TooltipContent>
      </Tooltip>
    </div>
  );
};

IconCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
};

export default IconCard;