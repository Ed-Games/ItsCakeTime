import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, Text, View, Keyboard } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { useUser } from "../../Contexts/UserContext";
import Security from "../../images/Security.png";
import { passwordValidationSchema } from "../../Schema/passwordValidationSchema";
import api from "../../services/api";
import styles from "./styles";

type ParamsProps = {
  token: string;
  email: string;
};

type Values = {
  password: string;
  confirmPassword: string;
};

export default function CreateNewPasswd({ route }: any) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const navigation = useNavigation();

  const { SaveUserDataToStorage } = useUser();

  const params = route.params as ParamsProps;

  async function handleNavigateToProfile(values: Values) {
    if (values.password == values.confirmPassword) {
      await handleResetPassword(values.password);
      navigation.navigate("Profile");
    }
  }

  async function handleResetPassword(password: string) {
    try {
      const response = await api.put(`users/resetPassword/${params.token}`, {
        email: params.email,
        password: password,
      });
      await SaveUserDataToStorage(response.data as any);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });
  }, [Keyboard]);

  return (
    <View style={styles.container}>
      <Header title="Digite uma nova senha segura" />
      {!isKeyboardOpen && <Image style={styles.Image} source={Security} />}

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => handleNavigateToProfile(values)}
        validationSchema={passwordValidationSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <>
            <Input
              setData={handleChange("password")}
              name="Nova senha :"
              placeholder="Nova senha"
              captalize="none"
              secureTextEntry={true}
              options={{
                titleMode: "Light",
              }}
            />

            {errors.password && (
              <Text style={{ fontSize: 15, color: "yellow", marginBottom: 5 }}>
                {errors.password}
              </Text>
            )}

            <Input
              setData={handleChange("confirmPassword")}
              name="Confirmar senha"
              placeholder="Confirme a nova senha"
              captalize="none"
              secureTextEntry={true}
              options={{
                titleMode: "Light",
              }}
            />

            {errors.confirmPassword && (
              <Text style={{ fontSize: 15, color: "yellow", marginBottom: 5 }}>
                {errors.confirmPassword}
              </Text>
            )}

            <RectButton
              onPress={handleSubmit as () => void}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Salvar</Text>
            </RectButton>
          </>
        )}
      </Formik>
    </View>
  );
}
