export interface NavLinkInterface {
  home: string;
  shop: string;
  contatUs: string;
  blog: string;
}

export default function NavItem(props: NavLinkInterface) {
  return (
    <>
      <li>
        <a href={props.home} className="hover:text-black font-semibold">
          Home
        </a>
      </li>
      <li>
        <a href={props.shop} className="hover:text-black font-semibold">
          Shop
        </a>
      </li>
      <li>
        <a href={props.contatUs} className="hover:text-black font-semibold">
          Contact Us
        </a>
      </li>
      <li>
        <a href={props.blog} className="hover:text-black font-semibold">
          Blog
        </a>
      </li>
    </>
  );
}
