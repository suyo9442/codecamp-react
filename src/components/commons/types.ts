import { type MouseEvent } from "react";

export interface ICommonsComponentsProps {
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  onEdit?: (e: MouseEvent<HTMLButtonElement>) => void;
  fill?: boolean;
}
