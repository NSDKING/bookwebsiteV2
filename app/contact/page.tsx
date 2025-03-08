"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.css"; // Import the CSS file
import BottomTab from "../components/BottomTabs";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

 
  const onSubmit = async (data) => {
    try {
 

 
 
    } catch (err) {
 
    }
  };

  return (
    <main>
        <h1 className="header-title">laLecturejecontribue</h1>

       <div className="container">
 
        {/* Contact Information */}
        <section className="section">
          <h2>Informations de contact</h2>
          <div className="contact-info">
            <p>
              <strong>Téléphone:</strong>
            </p>
            <p>+237 679 678 406</p>
            <p>+237 697 682 375</p>

            <p>
              <strong>Emplacement:</strong>
            </p>
            <p>Douala</p>

            <p>
              <strong>Email:</strong>
            </p>
            <p>haussinj@yahoo.fr</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="form-section">
          <h2>Envoyez-nous un message</h2>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" {...register("name", { required: true })} />
              {errors.name && <p className="error">Le nom est requis</p>}
            </div>

            <div className="form-group">
              <label htmlFor="mail">Email</label>
              <input type="email" id="mail" {...register("mail", { required: true })} />
              {errors.mail && <p className="error">L'email est requis</p>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Votre Message</label>
              <textarea id="message" {...register("message", { required: true })} rows="4"></textarea>
              {errors.message && <p className="error">Le message est requis</p>}
            </div>

            <button type="submit" className="submit-btn">Envoyer</button>
          </form>
        </section>
      </div>
    <BottomTab/>
    </main>
  );
}
