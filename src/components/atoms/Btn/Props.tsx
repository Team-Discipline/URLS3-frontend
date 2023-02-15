
import { ButtonHTMLAttributes } from "react";

type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /* Button 색상을 결정하는 prop입니다. */
    variant: Variant;

    /* Button Size를 결정하는 prop입니다. */
    size: Size;

    /* Button이 fullWidth를 차지할 것인지 결정하는 prop입니다.*/
    fullWidth: boolean;
}

export type Props = Partial<ButtonProps>;