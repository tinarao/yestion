import { LoaderIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
    "animate-spin",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                lg: "h-6 w-6",
                xl: "h-8 w-8",
                icon: "h-10 w-10",
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {

}

const Loader = ({ size }: SpinnerProps) => {
  return <LoaderIcon className={cn(spinnerVariants({ size }))} />
}

export default Loader