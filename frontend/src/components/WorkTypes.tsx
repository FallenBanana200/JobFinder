import React from "react";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import "../css/WorkTypes.css";
import { Link } from "react-router-dom";

function WorkTypes() {
    return (
        <div className="work_types_container">
            <div className="work_types">
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-students-working-in-cartoon-illustration-style-writing-papers-free-material-download-image_2281633.jpg)' }} ><span className="card-text">Student work</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://a0.anyrgb.com/pngimg/1626/442/hand-painted-teacher-teaching-student-teacher-school-teacher-teacher-education-teachers-tutor-classroom-teacher-learning-project.png)' }} ><span className="card-text">Education</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://www.it.miami.edu/_assets/images/about-umit-new-small.jpg)' }} ><span className="card-text">Information technology</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blta401f2e7dad39503/620d844d9d54947c7f131b0a/illustration-industry-health.png)' }} ><span className="card-text">Healthcare</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/financial-accounting-female-accountant-cartoon-character-making-financial-report-summary-analysis-reporting-financial-statement-income-balance-vector-isolated-concept-metaphor-illustration_335657-2801.jpg)' }} ><span className="card-text">Finance and Accounting</span></Card>
                    </IconButton>
                </Link>
                <IconButton>
                    <Card className="work_card" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1713348946/vector/adult-man-gasman-engineer-cartoon-character-in-helmet-and-uniform-working-at-operation-panel.jpg?s=612x612&w=0&k=20&c=JA4EfOPpAY5GasGEpwLqsSF04GQpbtWBLXHCnKrLJLs=)' }} ><span className="card-text">Engineering and Tech</span></Card>
                </IconButton>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://www.shutterstock.com/image-vector/hospitality-workers-hotel-staff-characters-600nw-1810195201.jpg)' }} ><span className="card-text">Hospitality and Tourism</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/05/71/49/77/360_F_571497713_B6hh5t8vy4pRrAz8n3vmJnAg0NtpeePQ.jpg)' }} ><span className="card-text">Logistics and Transportation</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/009/428/826/original/multimedia-cartoon-icon-illustration-art-technology-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg)' }} ><span className="card-text">Arts and Media</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/donation-center-visit-2d-vector-isolated-illustration-non-profit-foundation-help-happy-volunteers-flat-characters-cartoon-background-contributing-social-service-organizations-colourful-scene_151150-6592.jpg)' }} ><span className="card-text">Social Work and Non-Profit Organizations</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/025/131/789/small_2x/business-growth-2d-animation-analyst-pulling-arrow-up-graph-4k-motion-graphic-boost-productivity-profits-sales-increase-chart-colorful-animated-cartoon-flat-concept-white-background-video.jpg)' }} ><span className="card-text">Sales and Marketing</span></Card>
                    </IconButton>
                </Link>
                <Link to={'/app'}>
                    <IconButton>
                        <Card className="work_card" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1145122270/vector/lawyer-legal-advisor-holding-gavel-flat-character.jpg?s=612x612&w=0&k=20&c=sB8pT08hx4yhMUyFE8AGXEmpIYg4I4W-Cxf9YozOh-o=)' }} ><span className="card-text">Legal Work</span></Card>
                    </IconButton>
                </Link>
            </div>
        </div>
    );
}

export default WorkTypes;
