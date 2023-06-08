import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import Biography from "../../components/BiographyContainer/Biography";
import Header from "../../components/Header/Header";
import Waves from "../../images/waves.png";
import styles from "./style";
import { useUser } from "../../Contexts/UserContext";
import { ImageUpload } from "../../utils/PickerImage";

export default function Profile({ navigation, routes }: any) {
  const [image, setImage] = useState("");
  const [data, setData] = useState<Profile>();
  const { loggedUser, LoadProfileDataFromAPI } = useUser();

  const handleChangeProfileDataState = async () => {
    const profile = await LoadProfileDataFromAPI();
    setData(profile);
  };

  async function GetSelectedProfileData(id: string) {
    try {
      const { data } = await api.get(`/profile/${id}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageUpload() {
    const imageData = new FormData();
    let id = loggedUser.id;

    imageData.append("image", {
      type: "image/jpg",
      uri: image,
      name: "profileImage",
    } as any);

    await api
      .put(`profile/update/${id}`, imageData)
      .catch((err) => console.log(err));

    setImage("");
    handleChangeProfileDataState();
  }

  useEffect(() => {
    if(routes?.name == "Details") {
      GetSelectedProfileData(routes?.params?.id);
    } else {
      handleChangeProfileDataState();
    }
  }, [routes]);

  return (
    <View style={styles.container}>
      <View>
        <Header backgroundColor="#9553A0" />
        <ImageBackground style={styles.Waves} source={Waves}>
          <View style={{ flexDirection: "row" }}>
            {image ? (
              <View style={styles.UpdateImageView}>
                <Image
                  key={image + "image"}
                  source={{ uri: image }}
                  style={styles.Avatar}
                />
                <View style={styles.buttonsView}>
                  <RectButton
                    key={image + "button-save"}
                    onPress={handleImageUpload}
                    style={styles.Savebutton}
                  >
                    <Feather name="check-circle" size={24} color="white" />
                  </RectButton>
                  <RectButton
                    key={image + "button-cancel"}
                    onPress={() => setImage("")}
                    style={styles.Cancelbutton}
                  >
                    <Feather name="x" size={24} color="white" />
                  </RectButton>
                </View>
              </View>
            ) : (
              <>
                <Image source={{ uri: data?.imageUrl }} style={styles.Avatar} />
                {loggedUser.id == data?.user_id && (
                  <RectButton
                    onPress={() => ImageUpload(setImage)}
                    style={styles.EditButton}
                  >
                    <Feather name="camera" size={24} color="#FFF" />
                  </RectButton>
                )}
              </>
            )}
          </View>
          <Text style={styles.Name}>{data?.userName}</Text>
        </ImageBackground>
      </View>
      <Biography data={data as Profile} user={loggedUser.id} />
    </View>
  );
}
