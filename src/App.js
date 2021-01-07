import React, { useEffect, useState } from "react";

import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("repositories").then((response) => {
            setRepositories(response.data);
        });
    }, []);

    async function handleLikeRepository(id) {
        const response = await api.post(`/repositories/${id}/like`);

        const likedRepository = response.data;
        setRepositories(
            repositories.map((repository) => {
                if (repository.id === id) {
                    repository.likes = likedRepository.likes;
                }

                return repository;
            })
        );
    }

    async function handleAddRepository() {
        const response = await api.post("repositories", {
            title: `Nice Repository ${Date.now()}`,
            url: "http://github.com/nicerepo",
            techs: ["node", "js", "react", "react-native"],
        });

        const repository = response.data;

        setRepositories([...repositories, repository]);
    }

    console.log(repositories);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.container}
                    data={repositories}
                    keyExtractor={(repository) => repository.id}
                    renderItem={({ item: repository }) => (
                        <View
                            style={styles.repositoryContainer}
                            key={repository.id}
                        >
                            <Text style={styles.repository}>
                                {repository.title}
                            </Text>

                            <View style={styles.techsContainer}>
                                {repository.techs.map((tech, idx) => {
                                    <Text style={styles.tech} key={idx}>
                                        {tech}
                                    </Text>;
                                })}
                            </View>

                            <View style={styles.likesContainer}>
                                <Text
                                    style={styles.likeText}
                                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                                    testID={`repository-likes-${repository.id}`}
                                >
                                    {`${repository.likes} curtidas`}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    handleLikeRepository(repository.id)
                                }
                                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                                testID={`like-button-${repository.id}`}
                            >
                                <Text style={styles.buttonText}>Curtir</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* {repositories.map((repository) => {
                    <View
                        style={styles.repositoryContainer}
                        key={repository.id}
                    >
                        <Text style={styles.repository}>
                            {repository.title}
                        </Text>

                        <View style={styles.techsContainer}>
                            {repository.techs.map((tech, idx) => {
                                <Text style={styles.tech} key={idx}>
                                    {tech}
                                </Text>;
                            })}
                        </View>

                        <View style={styles.likesContainer}>
                            <Text
                                style={styles.likeText}
                                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                                testID={`repository-likes-${repository.id}`}
                            >
                                {`${repository.likes} curtidas`}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleLikeRepository(repository.id)}
                            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                            testID={`like-button-${repository.id}`}
                        >
                            <Text style={styles.buttonText}>Curtir</Text>
                        </TouchableOpacity>
                    </View>;
                })} */}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddRepository}
                >
                    <Text style={styles.addButtonText}>Criar Repositório</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    repository: {
        fontSize: 32,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likesContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 15,
    },
    addButton: {
        backgroundColor: "#FFF",
        margin: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        fontSize: 20,
    },
});
