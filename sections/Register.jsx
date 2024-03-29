'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '../components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const Register = () => {
    const router = useRouter()
    const { push } = useRouter();

    const [fname, setFname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [referred, setReferred] = useState();

    const registerIt = async () => {
        if (router.query.id != "" && router.query.id != undefined) {
            setReferred(router.query.id);
            console.log("SDgfsdf");
            const res = await fetch("https://godot-main-server.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, referred: router.query.id
                })
            })
            const statusCode = res.status;
            console.log(statusCode)
            if (statusCode == 200) {
                alert("User Added!!!")
                push(`/purchase?email=${email}&referredBy=${router.query.id}&name=${fname}`);
            } else {
                alert("Error while Adding User!!!")
            }
        } else if (referred != "" && referred != undefined) {
            const res = await fetch("https://godot-main-server.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, referred
                })
            })
            const statusCode = res.status;
            console.log(statusCode)
            if (statusCode == 200) {
                alert("User Added!!!")
                push(`/purchase?email=${email}&referredBy=${referred}&name=${fname}`);
            } else {
                alert("Error while Adding User!!!")
            }
        } else {
            alert("Referrel url is required to register...")
        }
    }

    return (
        <section className={`${styles.paddings}`} id="explore">
            <TitleText
                title={<>Register</>}
                textStyles="text-center"
            />
            <div className="form" style={{ padding: "1rem 0" }}>
                <input type="text" placeholder='Full Name' onChange={(e) => { setFname(e.target.value) }} />
                <input type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                <input type="text" placeholder='Referral Code' value={router.query.id ? router.query.id : referred} onChange={(e) => { setReferred(e.target.value) }} style={{ marginBottom: '0' }} />
                <p className="register_btn">Already a existing user? <span onClick={() => { push("/login"); }}>Login Now!!!</span></p>
                <button onClick={registerIt}>Register</button>
            </div>
        </section>
    );
};

export default Register;
