import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // Para navegação atravez de função
    const history = useHistory();

    async function HandleRegister(e) {

        // e: evento
        // preventDefault: não deixa que a pagina recarregue quando o usuario clicar em cadastrar.
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            // Envio dos dados para a api.
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            // Redirecionamento atravez do history
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já possuo cadastro
                    </Link>
                </section>

                <form onSubmit={HandleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        //Valor padrão
                        value={name}
                        //Função que seta o novo valor
                        onChange={e => setName(e.target.value)} 
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />

                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}