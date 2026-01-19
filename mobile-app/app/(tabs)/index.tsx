import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const rtr = useRouter();

  const features = [
    {
      icon: "shield-checkmark",
      title: "Cloud Security",
      desc: "Comprehensive cloud infrastructure security",
    },
    {
      icon: "bug",
      title: "VAPT Services",
      desc: "Vulnerability Assessment and Penetration Testing",
    },
    {
      icon: "flash",
      title: "Real-time Detection",
      desc: "Instant threat detection and alerts",
    },
    {
      icon: "people",
      title: "Team Collaboration",
      desc: "Centralized security team platform",
    },
    {
      icon: "eye",
      title: "Reteam Assessment",
      desc: "In-depth security assessments",
    },
    {
      icon: "document-text",
      title: "Compliance Reports",
      desc: "Automated compliance documentation",
    },
  ];

  const services = [
    {
      icon: "cloud",
      title: "Cloud Security",
      desc: "AWS, Azure, GCP security audits and compliance",
      color: "#3b82f6",
    },
    {
      icon: "search",
      title: "VAPT",
      desc: "Network and web application security testing",
      color: "#a855f7",
    },
    {
      icon: "telescope",
      title: "Reteam Assessment",
      desc: "Security posture evaluation and risk analysis",
      color: "#06b6d4",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Report{"\n"}
          <Text style={styles.heroHighlight}>Vulnerabilities</Text>
          {"\n"}Efficiently
        </Text>
        <Text style={styles.heroSubtitle}>
          Streamlined issue tracking and management for your security team
        </Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => rtr.push("/(auth)/register")}
          >
            <Text style={styles.btnPrimaryText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => rtr.push("/(auth)/login")}
          >
            <Text style={styles.btnSecondaryText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Enterprise <Text style={styles.highlight}>Security</Text> Solutions
        </Text>
        <View style={styles.featuresGrid}>
          {features.map((f, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon as any} size={24} color="#10b981" />
              </View>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Our <Text style={styles.highlight}>Security</Text> Services
        </Text>
        {services.map((s, idx) => (
          <View
            key={idx}
            style={[styles.serviceCard, { borderColor: s.color + "40" }]}
          >
            <View
              style={[styles.serviceIcon, { backgroundColor: s.color + "20" }]}
            >
              <Ionicons name={s.icon as any} size={32} color={s.color} />
            </View>
            <Text style={styles.serviceTitle}>{s.title}</Text>
            <Text style={styles.serviceDesc}>{s.desc}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  hero: {
    padding: 20,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  heroHighlight: {
    color: "#10b981",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#10b981",
  },
  btnSecondaryText: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    color: "#10b981",
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  featureIcon: {
    backgroundColor: "#10b98120",
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: "#94a3b8",
  },
  serviceCard: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "center",
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});
