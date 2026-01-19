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

type Issue = {
  id: string;
  title: string;
  type: string;
  status: string;
  created_at: string;
  description: string;
};

export default function IssuesScreen() {
  const [issuesData, setIssuesData] = useState<Issue[]>([]);
  const [allData, setAllData] = useState<Issue[]>([]);
  const [ld, setLd] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });
  const [pg, setPg] = useState(1);
  const perPg = 6;

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      const start = (pg - 1) * perPg;
      const end = start + perPg;
      setIssuesData(allData.slice(start, end));
    }
  }, [pg, allData]);

  const fetchIssues = async () => {
    try {
      const res = await issues.getAll();
      const data = res.data.posts || [];
      setAllData(data);

      const start = (pg - 1) * perPg;
      const end = start + perPg;
      setIssuesData(data.slice(start, end));

      setStats({
        total: data.length,
        open: data.filter((i: Issue) => i.status === "open").length,
        resolved: data.filter((i: Issue) => i.status === "resolved").length,
      });
    } catch (err) {
      console.error("Failed to fetch issues");
    } finally {
      setLd(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return { bg: "#10b98120", border: "#10b98140", text: "#10b981" };
      case "in-progress":
        return { bg: "#eab30820", border: "#eab30840", text: "#eab308" };
      default:
        return { bg: "#ef444420", border: "#ef444440", text: "#ef4444" };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cloud Security":
        return { bg: "#3b82f620", border: "#3b82f640", text: "#3b82f6" };
      case "VAPT":
        return { bg: "#8b5cf620", border: "#8b5cf640", text: "#8b5cf6" };
      default:
        return { bg: "#06b6d420", border: "#06b6d440", text: "#06b6d4" };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalPgs = Math.ceil(allData.length / perPg);

  const goNext = () => {
    if (pg < totalPgs) setPg(pg + 1);
  };

  const goPrev = () => {
    if (pg > 1) setPg(pg - 1);
  };

  if (ld) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading issues...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Live <Text style={styles.accent}>Security</Text> Dashboard
        </Text>
        <Text style={styles.subtitle}>
          Real-time tracking of security vulnerabilities
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderColor: "#10b98140" }]}>
          <View style={styles.statTop}>
            <View>
              <Text style={styles.statLabel}>Total Issues</Text>
              <Text style={styles.statValue}>{stats.total}</Text>
            </View>
            <Ionicons name="trending-up" size={32} color="#10b981" />
          </View>
        </View>

        <View style={[styles.statCard, { borderColor: "#ef444440" }]}>
          <View style={styles.statTop}>
            <View>
              <Text style={styles.statLabel}>Open Issues</Text>
              <Text style={styles.statValue}>{stats.open}</Text>
            </View>
            <Ionicons name="alert-circle" size={32} color="#ef4444" />
          </View>
        </View>

        <View style={[styles.statCard, { borderColor: "#10b98140" }]}>
          <View style={styles.statTop}>
            <View>
              <Text style={styles.statLabel}>Resolved</Text>
              <Text style={styles.statValue}>{stats.resolved}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={32} color="#10b981" />
          </View>
        </View>
      </View>

      {/* Issues List */}
      {issuesData.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={48} color="#64748b" />
          <Text style={styles.emptyTitle}>No issues reported yet</Text>
          <Text style={styles.emptySubtitle}>
            Be the first to report a security vulnerability
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.issuesGrid}>
            {issuesData.map((issue) => {
              const statusColors = getStatusColor(issue.status);
              const typeColors = getTypeColor(issue.type);

              return (
                <View key={issue.id} style={styles.issueCard}>
                  <View style={styles.issueTags}>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: typeColors.bg,
                          borderColor: typeColors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.tagText, { color: typeColors.text }]}
                      >
                        {issue.type}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: statusColors.bg,
                          borderColor: statusColors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.tagText, { color: statusColors.text }]}
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
                    {formatDate(issue.created_at)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Pagination */}
          {totalPgs > 1 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageBtn, pg === 1 && styles.pageBtnDisabled]}
                onPress={goPrev}
                disabled={pg === 1}
              >
                <Text
                  style={[
                    styles.pageBtnText,
                    pg === 1 && styles.pageBtnTextDisabled,
                  ]}
                >
                  Previous
                </Text>
              </TouchableOpacity>

              <Text style={styles.pageInfo}>
                Page {pg} of {totalPgs}
              </Text>

              <TouchableOpacity
                style={[
                  styles.pageBtn,
                  pg === totalPgs && styles.pageBtnDisabled,
                ]}
                onPress={goNext}
                disabled={pg === totalPgs}
              >
                <Text
                  style={[
                    styles.pageBtnText,
                    pg === totalPgs && styles.pageBtnTextDisabled,
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
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
  loadingText: {
    color: "#94a3b8",
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  accent: {
    color: "#10b981",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
  },
  statsRow: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#10b98140",
    backgroundColor: "#1e293b",
  },
  emptyTitle: {
    fontSize: 18,
    color: "#94a3b8",
    marginTop: 16,
    fontWeight: "600",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
  },
  issuesGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  issueCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  issueTags: {
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
    marginBottom: 12,
    lineHeight: 20,
  },
  issueDate: {
    fontSize: 12,
    color: "#64748b",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 20,
    marginTop: 8,
  },
  pageBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#10b98120",
    borderWidth: 1,
    borderColor: "#10b98140",
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  pageBtnText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
  },
  pageBtnTextDisabled: {
    color: "#64748b",
  },
  pageInfo: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
