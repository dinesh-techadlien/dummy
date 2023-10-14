import React from 'react'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs';
import '../App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Docform from '../admin/adddoc'
import Recform from '../admin/addrec'
import DoctorList from '../admin/showdoc'
import Receptionist from '../admin/showrec'
import Location from '../admin/location';
import Home from './Home';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                {/* <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> SHOP
                </div> */}
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <Router>
                <ul className='sidebar-list'>
                    <li className='sidebar-list-item'>
                        <Link to="/home">
                            <BsGrid1X2Fill className='icon' /> Dashboard
                        </Link>
                    </li>
                    <li className='sidebar-list-item'>
                        <Link to="/adddoctorform">
                            <BsFillArchiveFill className='icon' /> Add_doctor_Form
                        </Link>
                    </li>
                    <li className='sidebar-list-item'>
                        <Link to="/receptionistform">
                            <BsFillGrid3X3GapFill className='icon' /> Receptionist_Form
                        </Link>
                    </li>
                    <li className='sidebar-list-item'>
                        <Link to="/doctorlist">
                            <BsPeopleFill className='icon' />Doctor_list
                        </Link>
                    </li>
                    <li className='sidebar-list-item'>
                        <Link to="/receptionistlist">
                            <BsListCheck className='icon' /> Receptionist_List
                        </Link>
                    </li>
                    <li className='sidebar-list-item'>
                        <Link to="/locationform">
                            <BsMenuButtonWideFill className='icon' /> Location_Form
                        </Link>
                    </li>
                    {/* <li className='sidebar-list-item'>
                        <a href="">
                            <BsFillGearFill className='icon' /> Setting
                        </a>
                    </li> */}
                </ul>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/adddoctorform" element={<Docform />} />
                    <Route path="/receptionistform" element={<Recform />} />
                    <Route path="/doctorlist" element={<DoctorList />} />
                    <Route path="/receptionistlist" element={<Receptionist />} />
                    <Route path="/locationform" element={<Location />} />
                </Routes>
            </Router>
        </aside>

    )
}

{/* <Router>
    <div className="App">
        <ul className="App-header">
            <li>
                <Link to="/adddoctorform">Add_doctor_Form</Link>
            </li>
            <li>
                <Link to="/receptionistform">Receptionist_Form</Link>
            </li>
            <li>
                <Link to="/doctorlist">Doctor_list</Link>
            </li>
            <li>
                <Link to="/receptionistlist">Receptionist_List</Link>
            </li>
            <li>
                <Link to="/locationform">Location_Form</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/adddoctorform" element={<Docform />} />
            <Route path="/receptionistform" element={<Recform />} />
            <Route path="/doctorlist" element={<DoctorList />} />
            <Route path="/receptionistlist" element={<Receptionist />} />
            <Route path="/locationform" element={<Location />} />
        </Routes>
    </div>
</Router> */}

export default Sidebar