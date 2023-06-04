import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Headerprops {
  title?: string;
  color?: string;
  titleStyle?: object;
  backgroundColor?: string;
}

export default function Header(props: Headerprops) {
  const navigation = useNavigation();

  function handleNavigateToPreviousPage() {
    navigation.goBack();
  }

  const backgroundColor = props.backgroundColor;

  return (
    <View
      style={
        backgroundColor
          ? { ...styles.headerView, backgroundColor }
          : styles.headerView
      }
    >
      <View style={styles.icons}>
        <Feather
          styles={styles.iconButton}
          name="arrow-left"
          size={24}
          color={props.color ? props.color : "#FFF"}
          onPress={handleNavigateToPreviousPage}
        />

        <Feather
          name="menu"
          size={25}
          color={props.color ? props.color : "#FFF"}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        />
      </View>
      <View style={styles.titleView}>
        {props.color ? (
          <Text
            style={[
              styles.title,
              {
                color: props.color,
              },
            ]}
          >
            {props.title}
          </Text>
        ) : (
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        )}
      </View>
    </View>
  );
}
