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
        <a href={props.home} className="hover:text-black  font-medium">
          Home
        </a>
      </li>
      <li>
        <a href={props.shop} className="hover:text-black font-medium">
          Shop
        </a>
      </li>
      <li>
        <a href={props.contatUs} className="hover:text-black  font-medium">
          Contact Us
        </a>
      </li>
      <li>
        <a href={props.blog} className="hover:text-black  font-medium">
          Blog
        </a>
      </li>
    </>
  );
}
