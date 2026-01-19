import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const rtr = useRouter();

  const features = [
    {
      icon: "shield-checkmark",
      title: "Cloud Security",
      desc: "Comprehensive cloud infrastructure security assessment and monitoring",
    },
    {
      icon: "bug",
      title: "VAPT Services",
      desc: "Vulnerability Assessment and Penetration Testing for your applications",
    },
    {
      icon: "people",
      title: "Red Team Assessment",
      desc: "Simulated attacks to test your security posture and response",
    },
    {
      icon: "pulse",
      title: "Real-time Monitoring",
      desc: "Live tracking of security issues and vulnerabilities",
    },
    {
      icon: "analytics",
      title: "Detailed Reports",
      desc: "Comprehensive security reports with actionable insights",
    },
    {
      icon: "rocket",
      title: "Fast Response",
      desc: "24/7 security team ready to respond to incidents",
    },
  ];

  const services = [
    {
      icon: "cloud",
      title: "Cloud Security",
      desc: "AWS, Azure, GCP security audits",
      color: "#3b82f6",
    },
    {
      icon: "code-slash",
      title: "Web Application",
      desc: "Secure code review & testing",
      color: "#8b5cf6",
    },
    {
      icon: "phone-portrait",
      title: "Mobile Security",
      desc: "iOS & Android app security",
      color: "#06b6d4",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Report{"\n"}
            <Text style={styles.heroAccent}>Vulnerabilities</Text>
            {"\n"}
            Efficiently
          </Text>
          <Text style={styles.heroSubtitle}>
            Streamlined issue tracking and management for your security team
          </Text>
          <View style={styles.heroBtns}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => rtr.push("/(auth)/register")}
            >
              <Text style={styles.primaryBtnText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => rtr.push("/(auth)/login")}
            >
              <Text style={styles.secondaryBtnText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Our <Text style={styles.accent}>Features</Text>
        </Text>
        <Text style={styles.sectionSubtitle}>
          Comprehensive security solutions for modern enterprises
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feat, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feat.icon as any} size={28} color="#10b981" />
              </View>
              <Text style={styles.featureTitle}>{feat.title}</Text>
              <Text style={styles.featureDesc}>{feat.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Our <Text style={styles.accent}>Services</Text>
        </Text>
        <Text style={styles.sectionSubtitle}>
          Expert security services tailored to your needs
        </Text>

        <View style={styles.servicesGrid}>
          {services.map((srv, idx) => (
            <View
              key={idx}
              style={[styles.serviceCard, { borderColor: srv.color + "40" }]}
            >
              <View
                style={[
                  styles.serviceIcon,
                  { backgroundColor: srv.color + "20" },
                ]}
              >
                <Ionicons name={srv.icon as any} size={32} color={srv.color} />
              </View>
              <Text style={styles.serviceTitle}>{srv.title}</Text>
              <Text style={styles.serviceDesc}>{srv.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerBrand}>
          <View style={styles.footerLogo}>
            <Ionicons name="shield-checkmark" size={28} color="#10b981" />
          </View>
          <Text style={styles.footerBrandText}>ApniSec</Text>
        </View>
        <Text style={styles.footerDesc}>
          Enterprise-grade security solutions for modern businesses
        </Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:contact@apnisec.com")}
          >
            <Text style={styles.footerLink}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.footerLink}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.footerLink}>Terms</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          © 2024 ApniSec. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  hero: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: "#0f172a",
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    lineHeight: 56,
  },
  heroAccent: {
    color: "#10b981",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 16,
    maxWidth: 600,
  },
  heroBtns: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryBtn: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#10b981",
  },
  secondaryBtnText: {
    color: "#10b981",
    fontSize: 18,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  accent: {
    color: "#10b981",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#10b98120",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  serviceIcon: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  footer: {
    padding: 40,
    paddingTop: 60,
    backgroundColor: "#1e293b",
    marginTop: 60,
    alignItems: "center",
  },
  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  footerLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#10b98120",
    justifyContent: "center",
    alignItems: "center",
  },
  footerBrandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  footerDesc: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 400,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  footerLink: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "500",
  },
  copyright: {
    fontSize: 12,
    color: "#64748b",
  },
});
