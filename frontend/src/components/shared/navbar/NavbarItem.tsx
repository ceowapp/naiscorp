import Link from 'next/link';

interface NavbarItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function NavbarItem({ href, label, onClick }: NavbarItemProps) {
  return (
    <Link
      href={href}
      className="text-3xl sm:text-4xl md:text-5xl font-medium text-white transition-colors duration-300 ease-in-out hover:text-gray-300" // Responsive text size
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
