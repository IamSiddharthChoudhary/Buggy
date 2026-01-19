import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [nm, setNm] = useState("");
  const [eml, setEml] = useState("");
  const [pw, setPw] = useState("");
  const [confPw, setConfPw] = useState("");
  const [ld, setLd] = useState(false);
  const rtr = useRouter();

  const hndlReg = async () => {
    if (!nm || !eml || !pw || !confPw) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (pw !== confPw) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (pw.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLd(true);
    try {
      const res = await auth.register(nm, eml, pw);
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      rtr.replace("/(tabs)/dashboard");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || "Registration failed");
    } finally {
      setLd(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="person-add" size={40} color="#10b981" />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join ApniSec to protect your enterprise
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person"
            size={20}
            color="#64748b"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#64748b"
            value={nm}
            onChangeText={setNm}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail"
            size={20}
            color="#64748b"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#64748b"
            value={eml}
            onChangeText={setEml}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#64748b"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#64748b"
            value={pw}
            onChangeText={setPw}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#64748b"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#64748b"
            value={confPw}
            onChangeText={setConfPw}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, ld && styles.btnDisabled]}
          onPress={hndlReg}
          disabled={ld}
        >
          <Text style={styles.btnText}>
            {ld ? "Creating..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => rtr.push("/(auth)/login")}>
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  iconBox: {
    alignSelf: "center",
    backgroundColor: "#10b98120",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a80",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 14,
  },
  btn: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  link: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
  },
});
