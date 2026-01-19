import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { issues } from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const [issuesData, setIssuesData] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [usr, setUsr] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const rtr = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const usrData = await AsyncStorage.getItem("user");
    if (usrData) {
      const u = JSON.parse(usrData);
      setUsr(u);
      fetchIssues(u.email);
    }
  };

  const fetchIssues = async (email: string) => {
    try {
      const res = await issues.getAll(email);
      setIssuesData(res.data.posts || []);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch issues");
    } finally {
      setLd(false);
    }
  };

  const createIssue = async () => {
    if (!title || !desc || !type) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await issues.create({ title, description: desc, type });
      setShowForm(false);
      setTitle("");
      setDesc("");
      setType("");
      fetchIssues(usr.email);
    } catch (err) {
      Alert.alert("Error", "Failed to create issue");
    }
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
        <Text style={styles.title}>Welcome, {usr?.name || "User"}</Text>
        <Text style={styles.subtitle}>
          Track and manage your security issues
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderColor: "#3b82f6" }]}>
          <Text style={styles.statValue}>{issuesData.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { borderColor: "#eab308" }]}>
          <Text style={styles.statValue}>
            {issuesData.filter((i) => i.status === "open").length}
          </Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={[styles.statCard, { borderColor: "#10b981" }]}>
          <Text style={styles.statValue}>
            {issuesData.filter((i) => i.status === "resolved").length}
          </Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.newBtn}
        onPress={() => setShowForm(!showForm)}
      >
        <Ionicons name={showForm ? "close" : "add"} size={20} color="#fff" />
        <Text style={styles.newBtnText}>
          {showForm ? "Cancel" : "New Issue"}
        </Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Issue title"
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Description"
            placeholderTextColor="#64748b"
            value={desc}
            onChangeText={setDesc}
            multiline
            numberOfLines={4}
          />
          <View style={styles.typeRow}>
            {["Cloud Security", "VAPT", "Reteam Assessment"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeBtn, type === t && styles.typeBtnActive]}
                onPress={() => setType(t)}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    type === t && styles.typeBtnTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.createBtn} onPress={createIssue}>
            <Text style={styles.createBtnText}>Create Issue</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.issues}>
        {issuesData.map((issue) => (
          <View key={issue.id} style={styles.issueCard}>
            <Text style={styles.issueTitle}>{issue.title}</Text>
            <View style={styles.issueTags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{issue.type}</Text>
              </View>
              <View
                style={[
                  styles.tag,
                  issue.status === "resolved" && styles.tagGreen,
                ]}
              >
                <Text style={styles.tagText}>{issue.status}</Text>
              </View>
            </View>
            <Text style={styles.issueDesc}>{issue.description}</Text>
          </View>
        ))}
      </View>
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
  statsRow: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  newBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  newBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  form: {
    padding: 20,
    backgroundColor: "#1e293b",
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  input: {
    backgroundColor: "#0f172a80",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  typeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  typeBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  typeBtnActive: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  typeBtnText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  typeBtnTextActive: {
    color: "#fff",
  },
  createBtn: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  issues: {
    padding: 20,
    gap: 12,
  },
  issueCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  issueTags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#3b82f620",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3b82f640",
  },
  tagGreen: {
    backgroundColor: "#10b98120",
    borderColor: "#10b98140",
  },
  tagText: {
    color: "#3b82f6",
    fontSize: 12,
  },
  issueDesc: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
