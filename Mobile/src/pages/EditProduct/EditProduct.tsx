import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";

import styles from "./styles";
import Waves from "../../images/waves.png";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import selectImg from "../../images/select.png";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import ModalView from "../../components/Modal/ModalView";
import { ModalButton } from "../../components/Modal/ModalButton";
import { ModalText } from "../../components/Modal/ModalText";
import { Formik, FormikProps, FormikValues } from "formik";
import { Picker } from "@react-native-picker/picker";
import { ImageUpload } from "../../utils/PickerImage";
import { ProductSchema } from "../../Schema/EditProductSchema";
import { useProduct } from "../../Contexts/ProductContext";

export interface RouteProps {
  Navigation: any;
  route: {
    params: {
      id: string;
      name: string;
      key: string;
    };
  };
}

type Product = {
  name: string;
  detail: string;
  price: string;
  image: string;
  category: string;
  imageUrl?: string;
};

export default function EditProduct() {
  const [image, setImage] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const categories = [
    "Bolos",
    "Tortas",
    "Salgados",
    "Biscoitos",
    "Doces",
    "Outros",
  ];
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const navigation = useNavigation();
  const { selectedProduct } = useProduct();

  function goBack() {
    navigation.goBack();
  }

  async function deleteProduct() {
    setModalVisible(false);
    if (selectedProduct?.id) {
      await api
        .delete(`products/delete/${selectedProduct.id}`)
        .then(async (response) => {
          goBack();
        });
    }
  }

  useEffect(() => {
    if (image == false) {
      formikRef.current?.setFieldValue("image", "", false);
    }
  }, [image]);

  async function handleUpdateProduct(values: Product) {
    if (selectedProduct?.id) {
      const data = new FormData();
      const name = values.name.replace(" ", "_");

      data.append("name", values.name);
      data.append("price", values.price as unknown as string);
      data.append("detail", values.detail);
      data.append("category", values.category);

      data.append("image", {
        name: `image_${name}.jpg`,
        type: "image/jpg",
        uri: values.image,
      } as any);

      try {
        const response = await api.put(
          `/products/update/${selectedProduct.id}/`,
          data
        );
        goBack();
      } catch (error) {
        Alert.alert("Ops! um erro ocorreu, tente novamente mais tarde");
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ height: 160 }}>
        <ImageBackground source={Waves} style={styles.waves}>
          <View style={{ marginBottom: 60 }} />
          <Header
            titleStyle={{ width: 315, textAlign: "center" }}
            title="Preencha os dados para atualizar seu produto"
          />
        </ImageBackground>
      </View>

      {selectedProduct && (
        <Formik
          enableReinitialize={true}
          innerRef={formikRef}
          initialValues={{
            name: selectedProduct.name,
            detail: selectedProduct.detail,
            price: selectedProduct.price,
            category: selectedProduct.category,
            image: selectedProduct.imageUrl,
          }}
          onSubmit={(values) => handleUpdateProduct(values as Product)}
          validationSchema={ProductSchema}
        >
          {({ handleSubmit, handleChange, errors, values }) => (
            <>
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  width: Dimensions.get("screen").width,
                }}
              >
                <Input
                  name="Nome: "
                  defaultValue={selectedProduct?.name}
                  setData={handleChange("name")}
                />

                {errors.name && (
                  <Text style={{ color: "red" }}>{errors.name.toString()}</Text>
                )}

                <Text style={styles.InputText}>Imagem:</Text>

                <View style={{ flexDirection: "row", width: "70%" }}>
                  {image ? (
                    <View
                      style={{
                        backgroundColor: "white",
                        height: 75,
                        width: 75,
                        marginBottom: 20,
                      }}
                    >
                      <Image
                        key={values.image}
                        source={{ uri: values.image }}
                        style={styles.UploadedImage}
                      />
                      <RectButton
                        onPress={() => setImage(false)}
                        style={styles.CloseButton}
                      >
                        <Feather name="x" size={18} color="#FFF" />
                      </RectButton>
                    </View>
                  ) : (
                    <RectButton
                      onPress={async () => {
                        const { canceled } = await ImageUpload(
                          handleChange("image")
                        );
                        setImage(!canceled);
                      }}
                      style={styles.UploadButton}
                    >
                      <Feather name="plus" size={24} color="#FFF" />
                    </RectButton>
                  )}
                </View>

                {errors.image && (
                  <Text style={{ color: "red" }}>
                    {errors.image.toString()}
                  </Text>
                )}

                <Input
                  options={{
                    useAsTextArea: true,
                    customStyle: { height: 115 },
                  }}
                  name="Detalhes: "
                  defaultValue={selectedProduct?.detail}
                  setData={handleChange("detail")}
                />

                {errors.detail && (
                  <Text style={{ color: "red" }}>
                    {errors.detail.toString()}
                  </Text>
                )}

                <Text style={styles.InputText}>Categoria: </Text>
                <View style={styles.pickerView}>
                  <Picker
                    onValueChange={handleChange("category")}
                    style={styles.CategoryInput}
                    selectedValue={values.category}
                  >
                    <Picker.Item
                      label={selectedProduct.category}
                      value={selectedProduct.category}
                    />

                    {categories.map((category, i) => {
                      if (category != selectedProduct?.category) {
                        return (
                          <Picker.Item
                            key={category + i}
                            label={category}
                            value={category}
                          />
                        );
                      }
                    })}
                  </Picker>
                  <Image style={styles.selectImg} source={selectImg} />
                </View>
                {errors.category && (
                  <Text style={{ color: "red" }}>
                    {errors.category.toString()}
                  </Text>
                )}

                <Input
                  name="Preço: "
                  defaultValue={JSON.stringify(selectedProduct?.price)}
                  setData={handleChange("price")}
                />

                {errors.price && (
                  <Text style={{ color: "red" }}>
                    {errors.price.toString()}
                  </Text>
                )}
              </ScrollView>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RectButton
                  onPress={handleSubmit as () => void}
                  style={[styles.actionButton, { backgroundColor: "#2BAF80" }]}
                >
                  <Text style={styles.actionButtonText}>Salvar</Text>
                </RectButton>
                <RectButton
                  onPress={goBack}
                  style={[styles.actionButton, { backgroundColor: "#455A64" }]}
                >
                  <Text style={styles.actionButtonText}>Cancelar</Text>
                </RectButton>
                <RectButton
                  onPress={() => setModalVisible(true)}
                  style={[styles.actionButton, { backgroundColor: "#FF0909" }]}
                >
                  <Text style={styles.actionButtonText}>Deletar</Text>
                </RectButton>
              </View>
            </>
          )}
        </Formik>
      )}

      <ModalView
        title="Atenção"
        isVisible={modalVisible}
        setStateFunction={setModalVisible}
      >
        <ModalText>Você tem certeza que deseja excluir esse produto?</ModalText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <ModalButton onPress={deleteProduct}>
            <ModalText>Sim</ModalText>
          </ModalButton>

          <ModalButton onPress={() => setModalVisible(false)}>
            <ModalText>Não</ModalText>
          </ModalButton>
        </View>
      </ModalView>
    </KeyboardAvoidingView>
  );
}
