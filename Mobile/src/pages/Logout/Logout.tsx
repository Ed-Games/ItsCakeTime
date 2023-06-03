import React from "react";
import { Image, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import styles from "./styles";
import Question from "../../images/Question.png";
import { RectButton } from "react-native-gesture-handler";
import { useUser } from "../../Contexts/UserContext";

export default function Logout({ navigation }: any) {
  const { ClearUserDataFromStorage } = useUser();

  function handleNavigateToPreviousPage() {
    navigation.goBack();
  }

  async function handleNavigateToLandingPage() {
    try {
      ClearUserDataFromStorage();
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Landing");
  }

  return (
    <View style={styles.container}>
      <Header color="#9553A0" title="Deseja realmente sair?" />
      <View style={styles.imageView}>
        <Image source={Question} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <RectButton
          onPress={handleNavigateToLandingPage}
          style={[styles.confirmButton, { backgroundColor: "#9553A0" }]}
        >
          <Text style={styles.confirmButtonText}>Sim</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigateToPreviousPage}
          style={[styles.confirmButton, { backgroundColor: "#F783EC" }]}
        >
          <Text style={styles.confirmButtonText}>Não</Text>
        </RectButton>
      </View>
    </View>
  );
}
