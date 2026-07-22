import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/add', label: 'Add' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'rounded-md bg-border px-4 py-2 text-sm font-medium text-text-primary sm:text-[15px] lg:text-base xl:text-lg'
      : 'rounded-md px-4 py-2 text-sm text-text-secondary transition hover:bg-elevated hover:text-text-primary sm:text-[15px] lg:text-base xl:text-lg';

  return (
    <nav className="border-b border-border bg-surface/95 px-3 py-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold text-text-primary sm:text-2xl lg:text-3xl xl:text-4xl">
          <img src={logo} alt="Finance-X Logo" className="h-8 w-8 rounded-md object-contain sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
          <span>Finance-X</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg text-text-primary max-[669px]:flex min-[670px]:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
{menuOpen
?<span className="material-symbols-outlined">close</span>
:<span className="material-symbols-outlined">menu</span>}
        </button>

        <div className="hidden items-center gap-10 min-[670px]:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-lg border border-border bg-bg p-2 max-[669px]:flex min-[670px]:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md bg-border px-4 py-2 text-sm font-medium text-text-primary sm:text-[15px] lg:text-base xl:text-lg'
                  : 'rounded-md px-4 py-2 text-sm text-text-secondary transition hover:bg-elevated hover:text-text-primary sm:text-[15px] lg:text-base xl:text-lg'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}