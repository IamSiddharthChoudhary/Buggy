import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { issues } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";

export default function IssuesScreen() {
  const [issuesData, setIssuesData] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [pg, setPg] = useState(1);
  const perPg = 10;

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await issues.getAll();
      setIssuesData(res.data.posts || []);
    } catch (err) {
      console.error("Failed to fetch");
    } finally {
      setLd(false);
    }
  };

  const stats = {
    total: issuesData.length,
    open: issuesData.filter((i) => i.status === "open").length,
    resolved: issuesData.filter((i) => i.status === "resolved").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "#10b981";
      case "in-progress":
        return "#eab308";
      default:
        return "#ef4444";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cloud Security":
        return "#3b82f6";
      case "VAPT":
        return "#a855f7";
      default:
        return "#06b6d4";
    }
  };

  const start = (pg - 1) * perPg;
  const end = start + perPg;
  const currentIssues = issuesData.slice(start, end);
  const totalPgs = Math.ceil(issuesData.length / perPg);

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
        <Text style={styles.title}>
          Live <Text style={styles.highlight}>Security</Text> Dashboard
        </Text>
        <Text style={styles.subtitle}>
          Real-time tracking of security vulnerabilities
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderColor: "#10b981" }]}>
          <Ionicons name="trending-up" size={24} color="#10b981" />
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Issues</Text>
        </View>
        <View style={[styles.statCard, { borderColor: "#ef4444" }]}>
          <Ionicons name="alert-circle" size={24} color="#ef4444" />
          <Text style={styles.statValue}>{stats.open}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={[styles.statCard, { borderColor: "#10b981" }]}>
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
          <Text style={styles.statValue}>{stats.resolved}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      <View style={styles.issues}>
        {currentIssues.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="alert-circle-outline" size={48} color="#64748b" />
            <Text style={styles.emptyText}>No issues reported yet</Text>
          </View>
        ) : (
          currentIssues.map((issue) => (
            <View key={issue.id} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: getTypeColor(issue.type) + "20",
                      borderColor: getTypeColor(issue.type) + "40",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: getTypeColor(issue.type) },
                    ]}
                  >
                    {issue.type}
                  </Text>
                </View>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: getStatusColor(issue.status) + "20",
                      borderColor: getStatusColor(issue.status) + "40",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: getStatusColor(issue.status) },
                    ]}
                  >
                    {issue.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.issueTitle} numberOfLines={1}>
                {issue.title}
              </Text>
              <Text style={styles.issueDesc} numberOfLines={2}>
                {issue.description}
              </Text>
              <Text style={styles.issueDate}>
                {new Date(issue.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
          ))
        )}
      </View>

      {issuesData.length > perPg && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageBtn, pg === 1 && styles.pageBtnDisabled]}
            onPress={() => setPg(pg - 1)}
            disabled={pg === 1}
          >
            <Text style={styles.pageBtnText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            Page {pg} of {totalPgs}
          </Text>
          <TouchableOpacity
            style={[styles.pageBtn, pg === totalPgs && styles.pageBtnDisabled]}
            onPress={() => setPg(pg + 1)}
            disabled={pg === totalPgs}
          >
            <Text style={styles.pageBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

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
  highlight: {
    color: "#10b981",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  issues: {
    padding: 20,
    gap: 12,
  },
  empty: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 12,
  },
  issueCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  issueHeader: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  issueDesc: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 8,
  },
  issueDate: {
    fontSize: 12,
    color: "#64748b",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 20,
  },
  pageBtn: {
    backgroundColor: "#10b98120",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  pageBtnDisabled: {
    opacity: 0.3,
  },
  pageBtnText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
  },
  pageInfo: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
