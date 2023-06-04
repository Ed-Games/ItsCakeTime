import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";
import * as MailComposer from "expo-mail-composer";

interface EmailProps {
  address: string;
}

export default function EmailButton(props: EmailProps) {
  function SendEmail() {
    MailComposer.composeAsync({
      subject: "Encomenda do It'cakeTime ",
      recipients: [props.address],
    });
  }

  return (
    <RectButton onPress={SendEmail} style={styles.EmailButton}>
      <View style={styles.FlexRowView}>
        <Feather
          name="mail"
          size={24}
          color="#FFF"
          style={{ marginLeft: 5, marginTop: 5 }}
        />
        <Text style={styles.ButtonText}>Enviar um Email</Text>
      </View>
    </RectButton>
  );
}
