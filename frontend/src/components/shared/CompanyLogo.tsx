import Link from 'next/link';
import Image from 'next/image';

const CompanyLogo: React.FC = () => {
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/logo.png" 
          alt="Naiscorp" 
          width={200} 
          height={48} 
        />
      </Link>
    </div>
  );
};

export default CompanyLogo;
