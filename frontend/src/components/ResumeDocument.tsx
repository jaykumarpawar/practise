"use client";

import { useEffect } from "react";
import { registerFonts } from "@/utils/registerFonts";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Calibri",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottom: "1pt solid black",
    paddingBottom: 6,
  },
  contact: {
    fontSize: 10,
    color: "gray",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 6,
    borderBottom: "0.5pt solid #444",
    paddingBottom: 3,
    textTransform: "uppercase",
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  org: {
    fontSize: 11,
    fontWeight: "bold",
  },
  role: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 2,
  },
  bullets: {
    marginLeft: 12,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 11,
    marginRight: 4,
  },
  bulletText: {
    fontSize: 11,
    flex: 1,
  },
});

function formatDateRange(start?: string, end?: string, current?: boolean) {
  if (!start) return "";
  const startStr = new Date(start).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endStr = current
    ? "Present"
    : end
    ? new Date(end).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";
  return `${startStr} – ${endStr}`;
}

export default function ResumeDocument({ data }: { data: any }) {
  useEffect(() => {
    registerFonts();
  }, []);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name || "FirstName LastName"}</Text>
          <Text style={styles.contact}>
            {data.address || "Street Address • City, State Zip"} •{" "}
            {data.email || "youremail@example.com"} •{" "}
            {data.phone || "123-456-7890"}
          </Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education?.map((edu: any, idx: number) => (
            <View key={idx} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.org}>
                  {edu.school || "University Name"}
                </Text>
                <Text>{edu.date || "Graduation Date"}</Text>
              </View>
              <Text>{edu.degree || "Degree, Major"}</Text>
              {edu.details && <Text>{edu.details}</Text>}
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences?.map((exp: any, idx: number) => (
            <View key={idx} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.org}>{exp.org || "Organization"}</Text>
                <Text>
                  {formatDateRange(exp.startDate, exp.endDate, exp.current) ||
                    "Month Year – Month Year"}
                </Text>
              </View>
              <Text style={styles.role}>{exp.role || "Position Title"}</Text>
              <View style={styles.bullets}>
                {(exp.bullets?.length
                  ? exp.bullets
                  : [
                      "Describe experience in bullet points.",
                      "Start with action verbs.",
                      "Quantify where possible.",
                    ]
                ).map((b: string, i: number) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills?.map((cat: any, idx: number) => (
            <View key={idx} style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>{cat.title}</Text>
              <Text>{cat.items.filter(Boolean).join(" • ")}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
