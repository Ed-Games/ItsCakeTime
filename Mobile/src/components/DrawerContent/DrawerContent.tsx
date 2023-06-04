import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import ButtonLink from "./ButtonLink";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../images/avatar.png";
import { useUser } from "../../Contexts/UserContext";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { LoadProfileDataFromAPI, profileData, loggedUser } = useUser();

  function handleNavigateToLogout() {
    props.navigation.navigate("Logout");
  }

  function handleNavigateToLogin() {
    props.navigation.navigate("Login");
  }

  useEffect(() => {
    LoadProfileDataFromAPI();
  }, [loggedUser]);

  return (
    <View style={styles.container}>
      {profileData ? (
        <View style={styles.ImageView}>
          <Image source={{ uri: profileData.imageUrl }} style={styles.Avatar} />
          <Text style={styles.AvatarNameText}>{profileData.userName}</Text>
        </View>
      ) : (
        <View style={styles.ImageView}>
          <Image source={Avatar} style={styles.Avatar} />
          <Text style={styles.AvatarNameText}>Convidado</Text>
        </View>
      )}
      <View style={{ marginTop: 94, alignItems: "center" }}>
        <View style={styles.LineSpace}></View>
        <ButtonLink
          icon="home"
          title="Inicio"
          drawerProps={props}
          navigateTO="Landing"
        />
        {profileData && (
          <ButtonLink
            icon="user"
            title="Seu Perfil"
            drawerProps={props}
            navigateTO="Profile"
          />
        )}
        <ButtonLink
          icon="shopping-cart"
          title="Lista de Produtos"
          drawerProps={props}
          navigateTO="ProductList"
        />
        <ButtonLink
          icon="search"
          title="Pesquisar Padeiros"
          drawerProps={props}
          navigateTO="Search Profiles"
        />
        {profileData && (
          <ButtonLink
            icon="plus-circle"
            title="Novo Produto"
            drawerProps={props}
            navigateTO="ProductRegister"
          />
        )}
      </View>
      <View style={styles.BottomContainer}>
        {profileData ? (
          <RectButton
            onPress={handleNavigateToLogout}
            style={styles.SignOutButton}
          >
            <Feather name="log-out" size={24} color="#9553A0" />
            <Text style={styles.SignOutText}>sair</Text>
          </RectButton>
        ) : (
          <RectButton
            onPress={handleNavigateToLogin}
            style={styles.SignOutButton}
          >
            <Feather name="log-in" size={24} color="#9553A0" />
            <Text style={styles.SignOutText}>Entrar</Text>
          </RectButton>
        )}
      </View>
    </View>
  );
}
