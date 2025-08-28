export interface NavLinkInterfaceMobile {
  home: string;
  shop: string;
  contatUs: string;
  blog: string;
}

export default function NavItemMobile(props: NavLinkInterfaceMobile) {
  return (
    <>
      <li>
        <a
          href={props.home}
          className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 font-medium"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href={props.shop}
          className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 font-medium"
        >
          Shop
        </a>
      </li>
      <li>
        <a
          href={props.contatUs}
          className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 font-medium"
        >
          Contact Us
        </a>
      </li>
      <li>
        <a
          href={props.blog}
          className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 font-medium"
        >
          Blog
        </a>
      </li>
    </>
  );
}
