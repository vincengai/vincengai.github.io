import React, {useEffect, useState, useRef} from 'react'
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg"
import emailjs from '@emailjs/browser';
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Contact = () => {
    const form = useRef();

    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const sendEmail = (e) => {
        e.preventDefault();
        setButtonText("Sending...")
        emailjs.sendForm('service_dutlpzq', 'template_zqzseis', form.current, '24sEnACqlbvPDDbtB')
        .then((result) => {
           setStatus({success: true, message: "Message sent successfully"})
           setButtonText("Sent!")
        }, (error) => {
            setStatus({success: false, message: "Something went wrong, please try again later."})
        });

    };


    return (
        <section className='contact' id='connect'>
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                    <TrackVisibility>
                        {({ isVisible }) =>
                        <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
                        }
                    </TrackVisibility>
                    </Col>
                    <Col size={12} md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={sendEmail} ref={form}>
                            <Row>
                                <Col sm={12} className="px-1">
                                    <input type="text" placeholder="Name" name="user_name"/>
                                </Col>
                         
                                <Col sm={6} className="px-1">
                                    <input type="email"  placeholder="Email" name="user_email"/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="tel"  placeholder="Phone No." name="user_phone"/>
                                </Col>
                                <Col>
                                    <textarea sm={12} row="6" placeholder="Message" name="message"/>
                                {
                                    status.message && 
                                    <Col sm={12}>
                                        <p className={status.success === false ? "danger" : "success"}> {status.message} </p>
                                    </Col>
                                }
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>

                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
