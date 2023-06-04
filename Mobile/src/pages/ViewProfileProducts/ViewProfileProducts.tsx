import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import avatar from "../../images/avatar.png";

import styles from "./styles";
import notFoundImg from "../../images/NotFound.png";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import ProductItem from "../../components/ProductItem/ProductItem";
import { ScrollView } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";

interface RouteProps {
  route: {
    name: string;
    params: {
      id: string;
      image: string;
      name: string;
      imageUrl: string;
    };
  };
}

export default function ViewProfileProducts(props: any) {
  const [products, setProducts] = useState<Product[]>();

  async function getProducts(id: string) {
    await api.get(`profile/${id}/products`).then((response) => {
      setProducts(response.data);
    });
  }

  useEffect(() => {
    getProducts(props.params?.id);
  }, [props.params?.id]);

  return (
    <View style={styles.container}>
      <Header backgroundColor="#9553A0" />
      <View style={styles.header}>
        <Image
          source={
            props.params?.image ? { uri: props.params?.imageUrl } : avatar
          }
          style={styles.avatar}
        />
        <Text style={styles.title}>
          {" "}
          Lista de produtos de {props.params?.name}
        </Text>
      </View>
      <View style={styles.products}>
        {products?.length != 0 ? (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 180,
            }}
          >
            {products?.map((product) => {
              return (
                <ProductItem
                  Data={product}
                  EditButton={false}
                  InfoButton={false}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View style={{ marginTop: 50 }}>
            <Image style={styles.notFoundImg} source={notFoundImg} />
            <Text style={styles.notFoundText}>
              Ops!... este usuário ainda não possui produtos
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
