import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [usr, setUsr] = useState<any>(null);
  const [ld, setLd] = useState(true);
  const [nmLd, setNmLd] = useState(false);
  const [pwLd, setPwLd] = useState(false);

  const [newName, setNewName] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confPw, setConfPw] = useState("");

  const rtr = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const tk = await AsyncStorage.getItem("token");
    const usrData = await AsyncStorage.getItem("user");

    if (!tk) {
      rtr.replace("/(auth)/login");
      return;
    }

    if (usrData) {
      const u = JSON.parse(usrData);
      setUsr(u);
      setNewName(u.name || "");
    }
    setLd(false);
  };

  const updName = async () => {
    if (!newName.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    setNmLd(true);
    try {
      await user.updateName(newName);

      const updUsr = { ...usr, name: newName };
      setUsr(updUsr);
      await AsyncStorage.setItem("user", JSON.stringify(updUsr));

      Alert.alert("Success", "Name updated successfully!");
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.error || "Failed to update name",
      );
    } finally {
      setNmLd(false);
    }
  };

  const updPw = async () => {
    if (!oldPw || !newPw || !confPw) {
      Alert.alert("Error", "Please fill all password fields");
      return;
    }

    if (newPw !== confPw) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (newPw.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setPwLd(true);
    try {
      await user.updatePassword(oldPw, newPw);

      Alert.alert("Success", "Password updated successfully!");
      setOldPw("");
      setNewPw("");
      setConfPw("");
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.error || "Failed to update password",
      );
    } finally {
      setPwLd(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          rtr.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (ld) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="person" size={20} color="#10b981" />
          </View>
          <Text style={styles.cardTitle}>Account Information</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person" size={16} color="#64748b" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{usr?.name || "Not set"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={16} color="#64748b" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{usr?.email}</Text>
          </View>
        </View>
      </View>

      {/* Update Name Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="create" size={20} color="#10b981" />
          </View>
          <Text style={styles.cardTitle}>Update Name</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>New Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new name"
            placeholderTextColor="#64748b"
            value={newName}
            onChangeText={setNewName}
          />
          <TouchableOpacity
            style={[styles.btn, nmLd && styles.btnDisabled]}
            onPress={updName}
            disabled={nmLd}
          >
            <Text style={styles.btnText}>
              {nmLd ? "Updating..." : "Update Name"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Change Password Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="lock-closed" size={20} color="#10b981" />
          </View>
          <Text style={styles.cardTitle}>Change Password</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            value={oldPw}
            onChangeText={setOldPw}
            secureTextEntry
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            value={newPw}
            onChangeText={setNewPw}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            value={confPw}
            onChangeText={setConfPw}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.btn, pwLd && styles.btnDisabled]}
            onPress={updPw}
            disabled={pwLd}
          >
            <Text style={styles.btnText}>
              {pwLd ? "Updating..." : "Change Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  loading: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
  },
  card: {
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#10b98120",
    borderWidth: 1,
    borderColor: "#10b98140",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#0f172a80",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: -8,
  },
  input: {
    backgroundColor: "#0f172a80",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ef444440",
    backgroundColor: "#ef444420",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },
});
