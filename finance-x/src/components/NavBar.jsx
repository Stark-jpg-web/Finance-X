
import {NavLink} from 'react-router-dom'

const links = [
  { to: "/",               label: "Dashboard"    },
  { to: "/transactions",   label: "Transactions" },
  { to: "/add",            label: "Add"          },
  { to: "/settings",       label: "Settings"     },
]

export default function NavBar() {


    return(
    <>
    <nav className="nav bg-surface text-text-secondary   text-sm flex flex-col items-center gap-4 p-4"> 
        <h2 className="logo text-text-primary text-xl">Finance-X</h2>
{links.map(link =>(
    <NavLink
    key={link.to}
    to={link.to}
    className={({isActive})  => isActive ? "bg-border px-4 py-1.5 rounded-md text-text-primary" : ""}
    >   {link.label}
    </NavLink>
))}
</nav>
    </>
)

}