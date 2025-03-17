import React from "react";

interface Props {
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>>;
    label: string
}

const IconButton = ({ icon: Icon, label }: Props) => {
    return (
        <button className='flex items-center space-x-2 hover:text-white'>
            <Icon className='h-5 w-5' aria-hidden="true" />
            <span>{label}</span>
        </button>
    )
}

export default IconButton
