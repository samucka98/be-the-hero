import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    // Configuração de scroll infinito
    const [page, setPage] = useState(1); // Seta a pagina para começar na 1.
    const [loading, setLoading] = useState(false); // Armazena informações quando estiver buscando dados novos, para evitar que sejam buscados novamente, carregando uma pagina por vez.

    const navigation = useNavigation(); // Semelhante ao history.

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) { // Caso ja tenha carregado tudo.
            return;
        }

        setLoading(true);

        const response = await api.get('/incidents', {
            params: { page }
        });

        // Copia dados...: para anexar as novas paginas.
        setIncidents([...incidents, ...response.data]); // Anexo de dois vetores.
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} // Quando o usuario chegar no final da lista.
                onEndReachedThreshold={0.2} // Quando chegar a um determinado ponto, carregar novos itens.
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText} >Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e82041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}