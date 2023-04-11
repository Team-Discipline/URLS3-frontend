
import { ButtonHTMLAttributes } from "react";

type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: Variant;
    size: Size;
    fullWidth?: boolean;
}

export type Props = Partial<ButtonProps>;