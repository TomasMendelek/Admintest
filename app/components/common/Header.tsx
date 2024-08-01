import Link from "next/link";

interface Store {
  id: string;
  name: string;
}

interface HeaderProps {
  store: Store;
}

const Header = ({ store }: HeaderProps) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href={`/${store.id}`} className="text-xl font-bold">
            {store.name}
          </Link>
        </div>
        <nav>
          <Link href={`/${store.id}/dashboard`} className="ml-4">
            Dashboard
          </Link>
          <Link href={`/${store.id}/products`} className="ml-4">
            Products
          </Link>
          <Link href={`/${store.id}/orders`} className="ml-4">
            Orders
          </Link>
          <Link href={`/${store.id}/settings`} className="ml-4">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
