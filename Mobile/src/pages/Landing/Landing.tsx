import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useUser } from "../../Contexts/UserContext";
import bakerImage from "../../images/baker.png";
import Logo from "../../images/logo.png";
import styles from "./styles";
import Modal from "../../components/Modal/ModalView";
import { ModalText } from "../../components/Modal/ModalText";
import { useState } from "react";
import { ModalButton } from "../../components/Modal/ModalButton";


export default function Landing({navigation, params }: any) {
  const { LoadUserDataFromStorage } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  function handleNavigateToProductsList() {
    navigation.navigate("ProductList");
  }

  async function handleNavigateToNext() {
    const user = await AsyncStorage.getItem("@Key:user");
    navigation.navigate(user ? "Profile" : "Login");
  }

  useEffect(() => {
    LoadUserDataFromStorage();
  }, []);

  useEffect(() => {
    if (params && params.message === "connection error") {
      setModalVisible(true);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem vindo ao</Text>
      <Image style={styles.logo} source={Logo} />
      <Image source={bakerImage} />
      <Text style={styles.contentText}>
        Ter uma padaria por perto é bom, mas agora ela esta no seu bolso
      </Text>
      <Text style={styles.actionText}>O que deseja fazer?</Text>
      <View style={styles.buttonsView}>
        <RectButton
          onPress={handleNavigateToProductsList}
          style={styles.clientButton}
        >
          <Text style={styles.ButtonText}>Fazer uma encomenda</Text>
        </RectButton>
        <RectButton onPress={handleNavigateToNext} style={styles.bakerButton}>
          <Text style={styles.ButtonText}>Ver minha confeitaria</Text>
        </RectButton>
      </View>

      <Modal
        title="Erro de conexão"
        isVisible={modalVisible}
        setStateFunction={setModalVisible}
      >
        <ModalText>
          Desculpe, houve uma falha na conexão. Tente novamente mais tarde
        </ModalText>

        <ModalButton onPress={() => setModalVisible(false)}>
          <ModalText>Ok</ModalText>
        </ModalButton>
      </Modal>
    </View>
  );
}
