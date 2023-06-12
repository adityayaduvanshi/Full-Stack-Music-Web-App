import { IconType } from 'react-icons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
interface SidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  key: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      className={twMerge(
        `flex flex-row items-center h-auto w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && 'text-white'
      )}
      href={href}
    >
      <Icon size={26} />

      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
