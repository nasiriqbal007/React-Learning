type FooterProps = {
  email?: string;
};

function Footer({ email }: FooterProps) {
  return (
    <footer className="bg-(--primary-color) mt-6 text-center text-sm text-(--secondary-color) py-4">
      <ul className="flex flex-col justify-start items-start gap-4 mb-2 pl-20 py-5">
        <li>
          <a href="/about" className="hover:underline">
            About Us
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:underline">
            Contact {email}
          </a>
        </li>
        <li>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </li>
      </ul>

      <div className="container mx-auto">
        <p>&copy; 2026 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
