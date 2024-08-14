import { type MouseEvent } from "react";

export interface ICommonsComponentsProps {
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  onEdit?: (e: MouseEvent<HTMLButtonElement>) => void;
  fill?: boolean;
  id?: string;
}
