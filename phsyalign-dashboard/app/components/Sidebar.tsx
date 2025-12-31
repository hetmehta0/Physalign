import Hamburger from "./Hamburger";

export default function Sidebar() {
  return (
    <div>
        <div className="sidebar-header">
            <ul>
                <li>Settings</li> 
                <li>Help</li>
                <li>Sign Out</li>
                <li>DarkMode</li>
            </ul>
                <div className="hamburger">
                    <Hamburger />
                </div>
        </div>

    <style jsx>{`
        .sidebar-header {
            width: 200px;
            height: 100vh;
            background-color: #f4f6f8;
            }
        .sidebar-header ul {
            flex-wrap: wrap;
            float: left;
            margin: 20 0px;
            padding: 0 25px;
        }
        .sidebar-header ul li {
            list-style-type: none;
            padding: 10px;
        }
    `}</style>
    /</div>
  );
}