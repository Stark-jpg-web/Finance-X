
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
    <nav>
{links.map(link =>(
    <NavLink
    key={link.to}
    to={link.to}
    className={({isActive}) => isActive ? "active" : ""}
    >   {link.label}
    </NavLink>
))}
</nav>
    </>
)

}