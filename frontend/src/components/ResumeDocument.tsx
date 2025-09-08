// components/ResumeDocument.tsx

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Carlito font (Google Font, close to Calibri)
Font.register({
  family: "Calibri",
  fonts: [
    {
      src: "/fonts/calibri-regular.ttf",
    },
    {
      src: "/fonts/calibri-bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/calibri-italic.ttf",
      fontStyle: "italic",
    },
  ],
});

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
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottom: "1pt solid black",
    paddingBottom: 6,
  },
  contact: {
    fontSize: 11,
    color: "gray",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    // marginBottom: 6,
    // textTransform: "uppercase",
    // borderBottom: "1pt solid black",
    paddingBottom: 6,
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
  },
  bullets: {
    marginLeft: 12,
    marginTop: 6,
  },
  bullet: {
    fontSize: 12,
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  text: {
    fontSize: 11,
    flex: 1,
    paddingBottom: 0,
    marginBottom: 0,
  },
});

export default function ResumeDocument({ data }: { data: any }) {
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
          <View style={styles.entry}>
            <View style={styles.entryHeader}>
              <Text style={styles.org}>{data.expOrg || "Organization"}</Text>
              <Text>{data.expDate || "Month Year – Month Year"}</Text>
            </View>
            <Text style={styles.role}>{data.expRole || "Position Title"}</Text>
            <View style={styles.bullets}>
              {(
                data.expBullets.length || [
                  "Describe experience in bullet points.",
                  "Start with action verbs.",
                  "Quantify where possible.",
                ]
              ).map((b: string, i: number) => (
                <View style={styles.listItem} key={i}>
                  <Text style={styles.bullet}>{"\u2022"}</Text>
                  <Text style={styles.text}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Skills & Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text>
            {data.skills ||
              "Technical: List tools • Language: List languages • Interests: List hobbies"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
